import React from 'react';

interface AgeVerificationModalProps {
  onConfirm: () => void;
  onDecline: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onConfirm, onDecline }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-brand-deep-purple border-2 border-brand-pink/50 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
        {/* Decorative Badge */}
        <div className="mx-auto w-20 h-20 rounded-full bg-brand-pink/20 border-2 border-brand-pink flex items-center justify-center mb-6">
          <span className="font-heading text-3xl text-brand-pink">+18</span>
        </div>

        <h2 className="text-3xl font-heading text-white mb-3">
          Aviso de Verificación de Edad
        </h2>
        
        <div className="bg-brand-purple-dark/80 p-4 rounded-xl mb-6 text-left border border-brand-purple-light/20">
          <p className="text-gray-200 text-sm leading-relaxed mb-3">
            <strong className="text-brand-pink">ATENCIÓN:</strong> Mamacitos es una plataforma exclusiva para <strong>mayores de 18 años</strong>.
          </p>
          <p className="text-gray-300 text-xs leading-relaxed">
            Este sitio contiene material para adultos, ofertas de servicios profesionales, contenido discreto e interacciones entre adultos conscientes. Al ingresar, confirmas bajo protesta de decir verdad que cumples con la mayoría de edad legal en tu jurisdicción.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onConfirm}
            className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3.5 px-6 rounded-full text-base transition-all transform hover:scale-[1.02] shadow-lg shadow-brand-pink/30 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Soy Mayor de 18 Años (Entrar)
          </button>
          <button
            onClick={onDecline}
            className="w-full sm:w-1/3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3.5 px-4 rounded-full text-sm transition-colors border border-gray-700"
          >
            Salir
          </button>
        </div>

        <p className="text-[11px] text-gray-400 mt-4">
          Privacidad, Cifrado & Discreción Garantizados por Mamacitos Protocol.
        </p>
      </div>
    </div>
  );
};

export default AgeVerificationModal;
