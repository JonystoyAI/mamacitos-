
import React, { useState, useCallback } from 'react';
import { generateProfileBio } from '../../services/geminiService';

interface ProfileAssistantProps {
    onClose: () => void;
}

const ProfileAssistant: React.FC<ProfileAssistantProps> = ({ onClose }) => {
    const [keywords, setKeywords] = useState('');
    const [generatedBio, setGeneratedBio] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!keywords.trim()) {
            setError("Por favor, introduce algunas palabras clave.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setGeneratedBio('');
        try {
            const bio = await generateProfileBio(keywords);
            setGeneratedBio(bio);
        } catch (err) {
            setError("Hubo un error al generar la biografía. Por favor, inténtalo de nuevo.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [keywords]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-brand-slate rounded-lg shadow-2xl p-8 w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-3xl font-heading text-brand-pink mb-4">Asistente de Perfil con IA</h2>
                <p className="text-gray-300 mb-6">Describe tu personalidad, intereses o lo que buscas con algunas palabras clave (ej: 'divertida, amante de los viajes, busca amistad'). Nuestra IA creará una bio para ti.</p>

                <textarea
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Escribe tus palabras clave aquí..."
                    className="w-full h-24 bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-pink"
                />

                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full mt-4 bg-brand-pink hover:bg-opacity-80 text-white font-bold py-3 rounded-full transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generando...' : 'Generar Biografía'}
                </button>

                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                
                {generatedBio && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-white mb-2">Biografía Sugerida:</h3>
                        <div className="bg-gray-800 p-4 rounded-lg text-gray-200 whitespace-pre-wrap">
                            {generatedBio}
                        </div>
                         <button
                            onClick={() => navigator.clipboard.writeText(generatedBio)}
                            className="w-full mt-4 bg-brand-lime hover:bg-opacity-80 text-brand-deep-purple font-bold py-2 rounded-full transition-colors"
                        >
                            Copiar Texto
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileAssistant;
