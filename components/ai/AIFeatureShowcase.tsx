
import React, { useState } from 'react';
import ProfileAssistant from './ProfileAssistant';

const AIFeatureShowcase: React.FC = () => {
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    const aiFeatures = [
        {
            title: "Asistente de Perfil con IA",
            description: "Crea biografías atractivas y descripciones de servicios que capturan tu esencia, todo con el poder de Gemini.",
            action: () => setIsAssistantOpen(true),
            actionLabel: "Probar Ahora"
        },
        {
            title: "Desenfoque Facial Automático",
            description: "Sube tus fotos con total tranquilidad. Nuestra IA detecta y aplica efectos de desenfoque para mantener tu discreción.",
            action: null,
            actionLabel: ""
        },
        {
            title: "Armario Virtual",
            description: "Exprésate sin límites. Prueba virtualmente diferentes atuendos y estilos para mostrar todas tus facetas.",
            action: null,
            actionLabel: ""
        }
    ];

    return (
        <div className="py-20 bg-brand-deep-purple">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-heading text-white">Potenciado por Inteligencia Artificial</h2>
                    <p className="mt-2 text-lg text-gray-400">Herramientas innovadoras para una experiencia superior y más segura.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {aiFeatures.map((feature, index) => (
                        <div key={index} className="bg-brand-slate p-8 rounded-lg flex flex-col">
                            <h3 className="text-2xl font-heading text-brand-pink">{feature.title}</h3>
                            <p className="mt-2 text-gray-300 flex-grow">{feature.description}</p>
                            {feature.action && (
                                <button
                                    onClick={feature.action}
                                    className="mt-6 bg-brand-lime hover:bg-opacity-80 text-brand-deep-purple font-bold py-2 px-4 rounded-full transition-transform transform hover:scale-105"
                                >
                                    {feature.actionLabel}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {isAssistantOpen && <ProfileAssistant onClose={() => setIsAssistantOpen(false)} />}
        </div>
    );
};

export default AIFeatureShowcase;
