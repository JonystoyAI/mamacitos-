import React from 'react';
import Logo from './Logo';

interface EntryGateProps {
    onEnter: () => void;
}

const EntryGate: React.FC<EntryGateProps> = ({ onEnter }) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-brand-purple-dark text-white text-center p-4">
            <div className="mb-6">
                <Logo className="w-64 md:w-96 mx-auto" />
            </div>
            
            <span className="bg-brand-pink/20 border border-brand-pink text-brand-pink text-xs font-bold px-4 py-1.5 rounded-full mb-4 inline-block uppercase tracking-widest">
                +18 Sitio Exclusivo para Adultos
            </span>

            <p className="text-sm md:text-base text-gray-200 mb-8 max-w-xl px-4 leading-relaxed">
                Disfruta de conexiones discretas, con chica sis, tv, sissy, trans, jochis chiken y fems, de manera discreta, segura con perfiles verificados.
            </p>
            <button
                onClick={onEnter}
                className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3.5 px-12 rounded-full text-xl transition-transform transform hover:scale-105 shadow-xl shadow-brand-pink/30 flex items-center justify-center gap-2"
            >
                Entrar al Sitio (+18)
            </button>
        </div>
    );
};

export default EntryGate;
