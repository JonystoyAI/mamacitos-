import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // Helper to initialize Gemini client lazy-style
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API 1: Grounded Search for Real-Time Safety News & Local Events
  app.post('/api/safety-news', async (req, res) => {
    try {
      const { query = 'Noticias de seguridad, alertas y eventos locales para la comunidad en México', location = 'México' } = req.body;
      const ai = getGeminiClient();

      const promptText = `Eres el asistente de seguridad de la plataforma Mamacitos. Proporciona un resumen claro, verificado y estructurado con información real sobre: "${query}" en la región de ${location}. Enfócate en seguridad, recomendaciones para prestadoras de servicios y eventos relevantes.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const candidate = response.candidates?.[0];
      const text = response.text || 'No se obtuvieron resultados para la búsqueda.';

      // Extract Grounding Metadata
      const groundingMetadata = candidate?.groundingMetadata;
      const searchQueries = groundingMetadata?.webSearchQueries || [];
      const groundingChunks = groundingMetadata?.groundingChunks || [];

      const groundingSources = groundingChunks
        .map((chunk: any) => {
          if (chunk.web) {
            return {
              title: chunk.web.title || 'Fuente Web Verificada',
              url: chunk.web.uri || '#',
            };
          }
          return null;
        })
        .filter(Boolean);

      res.json({
        success: true,
        text,
        searchQueries,
        groundingSources,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('Error in /api/safety-news:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Error al realizar la búsqueda de seguridad.',
      });
    }
  });

  // API 2: Voice-to-Text Transcription for Direct Messaging
  app.post('/api/voice-transcribe', async (req, res) => {
    try {
      const { audioBase64, mimeType = 'audio/webm' } = req.body;

      if (!audioBase64) {
        return res.status(400).json({ success: false, error: 'audioBase64 is required.' });
      }

      const ai = getGeminiClient();

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: audioBase64,
              },
            },
            {
              text: 'Transcripción exacta y clara del audio a texto en español. Omite muletillas y mantén la conversación natural.',
            },
          ],
        },
      });

      const transcribedText = response.text?.trim() || '';

      res.json({
        success: true,
        text: transcribedText,
      });
    } catch (error: any) {
      console.error('Error in /api/voice-transcribe:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Error al transcribir el audio.',
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Mamacitos Platform Server' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
