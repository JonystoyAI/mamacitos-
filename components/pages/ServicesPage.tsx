
import React, { useState, useMemo } from 'react';
import { Profile, ProfileType } from '../../types';
import ProfileCard from '../common/ProfileCard';

const mockProviders: Profile[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 100,
    userIdCode: `MMC-SERV-${1000 + i}`,
    name: ['Luna', 'Estrella', 'Sol', 'Aurora', 'Venus', 'Zafiro', 'Esmeralda', 'Ruby', 'Diamante', 'Perla', 'Coral', 'Jade'][i % 12],
    age: 25 + (i % 8),
    location: ['Ciudad de México', 'Guadalajara', 'Monterrey'][i % 3],
    image: `https://picsum.photos/seed/${i + 100}/400/500`,
    isProvider: true,
    isVerified: true,
    verificationDoc: i % 2 === 0 ? 'INE' : 'Pasaporte',
    bio: 'Ofrezco una experiencia única y personalizada. Mi perfil es mi portafolio profesional, ¡visítalo!',
    profileType: (['sex_worker', 'personal_contact', 'other_services'] as ProfileType[])[i % 3],
    userType: 'TRANS(TRs)',
    seeking: 'Hombres(H)',
}));

type ServiceTab = 'sexvidoras' | 'contactos' | 'otros';

const ServicesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ServiceTab>('sexvidoras');

    const filteredProviders = useMemo(() => {
        const typeMap: Record<ServiceTab, ProfileType> = {
            sexvidoras: 'sex_worker',
            contactos: 'personal_contact',
            otros: 'other_services'
        };
        return mockProviders.filter(p => p.profileType === typeMap[activeTab]);
    }, [activeTab]);

    const TabButton: React.FC<{ tab: ServiceTab; label: string; }> = ({ tab, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-heading text-lg rounded-t-lg transition-colors duration-300 ${activeTab === tab ? 'bg-brand-slate text-brand-pink' : 'bg-transparent text-gray-400 hover:bg-brand-deep-purple/50 hover:text-white'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-heading text-white">Proveedores de Servicios</h1>
                <p className="mt-4 text-xl text-brand-purple-light max-w-3xl mx-auto">
                    Descubre perfiles profesionales con galerías, descripciones detalladas y más. Cada perfil es una landing page pública.
                </p>
            </div>

            {/* Submenu */}
            <div className="border-b border-gray-700 mb-8">
                <nav className="-mb-px flex justify-center space-x-2 sm:space-x-4" aria-label="Tabs">
                    <TabButton tab="sexvidoras" label="Sexvidoras" />
                    <TabButton tab="contactos" label="Contactos Personales" />
                    <TabButton tab="otros" label="Otros Servicios Profesionales" />
                </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProviders.map(provider => (
                    <ProfileCard key={provider.id} profile={provider} />
                ))}
            </div>

            <div className="mt-16 text-center bg-brand-slate p-8 rounded-lg">
                <h2 className="text-3xl font-heading text-brand-pink">¿Eres Proveedor?</h2>
                <p className="mt-2 text-lg text-gray-300">Transforma tu perfil en una landing page profesional y compartible. Alcanza a más clientes dentro y fuera de Mamacitos.</p>
                <button className="mt-6 bg-brand-pink hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
                    Activar Modo Proveedor
                </button>
            </div>
        </div>
    );
};

export default ServicesPage;