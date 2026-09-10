
import React from 'react';

interface LoginPageProps {
    onClose: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-brand-slate rounded-lg shadow-2xl p-8 w-11/12 md:w-2/3 lg:w-1/2 max-w-md relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-3xl font-heading text-center text-white mb-2">Bienvenida</h2>
                <p className="text-center text-gray-400 mb-6">Crea tu cuenta o inicia sesión para continuar.</p>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Correo electrónico</label>
                        <input type="email" name="email" id="email" className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-pink" />
                    </div>
                     <div>
                        <label htmlFor="password"className="block text-sm font-medium text-gray-300">Contraseña</label>
                        <input type="password" name="password" id="password" className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-pink" />
                    </div>
                    <button type="submit" className="w-full mt-4 bg-brand-pink hover:bg-opacity-80 text-white font-bold py-3 rounded-full transition-colors">
                        Continuar
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-gray-400">O</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>

                <button className="w-full bg-white hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2">
                     <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                    Continuar con Google
                </button>
            </div>
        </div>
    );
};

export default LoginPage;