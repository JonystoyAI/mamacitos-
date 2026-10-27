// Client-side service calling server proxy routes (/api/*) for security and quota resilience

export async function generateProfileBio(keywords: string): Promise<string> {
  try {
    const res = await fetch('/api/generate-bio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.text || 'Apasionada, auténtica y con encanto. Busco conectar con personas respetuosas que valoren la elegancia y los momentos memorables.';
  } catch (error) {
    console.warn('[GeminiService] Fallback to local profile bio generator:', error);
    const cleanKw = (keywords || '').trim();
    return `Espíritu auténtico y sofisticado con pasión por ${cleanKw || 'las buenas conversaciones y nuevas experiencias'}. Busco conectar con personas respetuosas que valoren la elegancia, la discreción y los momentos memorables.`;
  }
}

export async function generatePortfolioDescription(keywords: string): Promise<string> {
  try {
    const res = await fetch('/api/generate-portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.text || 'Ofrezco un espacio de desconexión absoluta, elegancia y atención exclusiva. Mi compromiso es brindarte una experiencia memorable donde la confianza y el respeto mutuo sean los protagonistas.';
  } catch (error) {
    console.warn('[GeminiService] Fallback to local portfolio description generator:', error);
    const cleanKw = (keywords || '').trim();
    return `Ofrezco un espacio de desconexión absoluta, elegancia y atención exclusiva centrada en ${cleanKw || 'bienestar, calidez y discreción'}. Mi compromiso es brindarte una experiencia memorable donde la confianza, el respeto mutuo y la atención al detalle sean los protagonistas.`;
  }
}
