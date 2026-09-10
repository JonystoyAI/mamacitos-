import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const SplashScreen: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const textTimer = setTimeout(() => {
            setTextVisible(true);
        }, 1000);

        return () => {
            clearTimeout(textTimer);
        };
    }, []);

    return (
        <div className={`flex flex-col justify-center items-center h-screen bg-brand-purple-dark text-white text-center p-4 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="mb-8 transform scale-150">
                <Logo className="w-64 md:w-96" />
            </div>
            <p className={`text-4xl font-heading transition-opacity duration-1000 delay-500 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
                Hola mamacito.
            </p>
        </div>
    );
};

export default SplashScreen;
