
import React from 'react';

const ReferralsPage: React.FC = () => {
    const referralLink = "https://mamacitos.com/ref/tu-usuario-123";

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-brand-slate p-8 rounded-lg shadow-2xl max-w-4xl mx-auto">
                <div className="text-center">
                    <h1 className="text-5xl font-heading text-white">Programa de Referidos</h1>
                    <p className="mt-4 text-xl text-brand-purple-light max-w-3xl mx-auto">
                        Expande tu red y extiende tu acceso premium. ¡Invita a nuevos usuarios y gana meses gratis!
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-3xl font-heading text-brand-pink">Tu Enlace de Referido Único</h2>
                    <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-2 bg-gray-800 p-4 rounded-lg">
                        <input 
                            type="text" 
                            readOnly 
                            value={referralLink} 
                            className="w-full sm:w-auto flex-grow bg-gray-700 text-gray-300 px-4 py-2 rounded-md border border-gray-600"
                        />
                        <button 
                            onClick={() => navigator.clipboard.writeText(referralLink)}
                            className="w-full sm:w-auto bg-brand-pink hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-md transition-colors"
                        >
                            Copiar
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">Comparte este enlace para empezar a ganar recompensas.</p>
                </div>

                <div className="mt-12">
                     <h3 className="text-2xl font-heading text-center text-white mb-6">¿Cómo Funciona?</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                         <div className="bg-brand-deep-purple/50 p-6 rounded-lg">
                             <h4 className="font-bold text-xl text-brand-pink mb-2">Gana por Registros</h4>
                             <p className="text-gray-300 text-sm mt-1">Por cada <span className="font-bold text-white">3 usuarios</span> que se registren en la app con tu enlace, recibes <span className="font-bold text-white">1 mes GRATIS</span> de acceso al modo Proveedor. ¡Este beneficio es acumulable!</p>
                         </div>
                         <div className="bg-brand-deep-purple/50 p-6 rounded-lg">
                             <h4 className="font-bold text-xl text-brand-pink mb-2">Gana por Conversión (Bono Único)</h4>
                             <p className="text-gray-300 text-sm mt-1">Si uno de tus referidos se suscribe a la modalidad de pago, obtienes <span className="font-bold text-white">3 meses MÁS</span> gratis. Este bono es válido una sola vez por cada referido que pague.</p>
                         </div>
                     </div>
                </div>

                 <div className="mt-12">
                    <h3 className="text-2xl font-heading text-center text-white mb-6">Estado de tus Referidos</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Referido</th>
                                    <th scope="col" className="px-6 py-3">Estado</th>
                                    <th scope="col" className="px-6 py-3">Recompensa Obtenida</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-brand-deep-purple/50 border-b border-gray-700">
                                    <td className="px-6 py-4 font-medium text-white">usuario_premium@email.com</td>
                                    <td className="px-6 py-4"><span className="bg-green-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Suscripción Paga</span></td>
                                    <td className="px-6 py-4 text-green-400">+3 Meses (Bono)</td>
                                </tr>
                                 <tr className="bg-brand-deep-purple/50 border-b border-gray-700">
                                    <td className="px-6 py-4 font-medium text-white">nuevo_usuario1@email.com</td>
                                    <td className="px-6 py-4"><span className="bg-yellow-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Registrado</span></td>
                                    <td className="px-6 py-4">Progreso 1/3 para 1 mes gratis</td>
                                </tr>
                                <tr className="bg-brand-deep-purple/50 border-b border-gray-700">
                                    <td className="px-6 py-4 font-medium text-white">nuevo_usuario2@email.com</td>
                                    <td className="px-6 py-4"><span className="bg-yellow-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Registrado</span></td>
                                    <td className="px-6 py-4">Progreso 2/3 para 1 mes gratis</td>
                                </tr>
                                <tr className="bg-brand-deep-purple/50">
                                    <td className="px-6 py-4 font-medium text-white">invitado@email.com</td>
                                    <td className="px-6 py-4"><span className="bg-gray-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">Invitado</span></td>
                                    <td className="px-6 py-4">Pendiente de registro</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReferralsPage;