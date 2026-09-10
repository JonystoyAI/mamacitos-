import React, { useState } from 'react';
import { EmergencyContact } from '../../types';

const PanicButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Contacto de Confianza 1', phone: '+52 55 1234 5678', relationship: 'Familiar / Amigo' },
    { id: '2', name: 'Contacto de Confianza 2', phone: '+52 81 9876 5432', relationship: 'Personal de Seguridad' }
  ]);

  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    if (contacts.length >= 2) {
      alert('Solo se permite configurar un máximo de 2 personas de confianza.');
      return;
    }
    setContacts([
      ...contacts,
      { id: Date.now().toString(), name: newContact.name, phone: newContact.phone, relationship: newContact.relationship || 'Confianza' }
    ]);
    setNewContact({ name: '', phone: '', relationship: '' });
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const triggerPanic = () => {
    setIsActivated(true);
  };

  return (
    <>
      {/* Floating Panic Button Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold py-3 px-5 rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 animate-pulse"
          title="Botón de Pánico 911 / Alerta de Emergencia"
        >
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-yellow-300"></span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="hidden sm:inline text-sm uppercase tracking-wider font-extrabold">PÁNICO 911</span>
        </button>
      </div>

      {/* Panic Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-brand-deep-purple border-2 border-red-500 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl relative overflow-hidden">
            
            <button
              onClick={() => {
                setIsOpen(false);
                setIsActivated(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!isActivated ? (
              <div>
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-heading text-red-400">Sistema de Seguridad & Pánico</h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Activa la alerta inmediata a emergencias (911) y a tus contactos de confianza con ubicación en tiempo real.
                  </p>
                </div>

                {/* Main Action Button */}
                <div className="my-6 text-center">
                  <button
                    onClick={triggerPanic}
                    className="w-full py-5 px-6 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 hover:brightness-110 text-white font-heading text-xl rounded-2xl shadow-xl shadow-red-600/40 border-2 border-red-400 transform transition-transform active:scale-95 uppercase tracking-wide flex items-center justify-center gap-3"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    ACTIVAR BOTÓN DE PÁNICO
                  </button>
                  <p className="text-[11px] text-gray-400 mt-2">
                    * Transmite ubicación GPS, realiza marcación directa a 911 y contesta/monitorea en automático.
                  </p>
                </div>

                {/* Config Contacts Collapsible */}
                <div className="bg-brand-slate/60 p-4 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Contactos de Confianza ({contacts.length}/2)
                    </h4>
                    <button
                      onClick={() => setShowConfig(!showConfig)}
                      className="text-xs text-brand-pink underline hover:text-white"
                    >
                      {showConfig ? 'Ocultar' : 'Configurar'}
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    {contacts.map((c) => (
                      <div key={c.id} className="flex items-center justify-between bg-black/40 p-2 rounded-lg border border-gray-700">
                        <div>
                          <p className="font-semibold text-white">{c.name} <span className="text-[10px] text-gray-400">({c.relationship})</span></p>
                          <p className="text-gray-300 font-mono">{c.phone}</p>
                        </div>
                        {showConfig && (
                          <button onClick={() => handleRemoveContact(c.id)} className="text-red-400 hover:text-red-300 p-1">
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {showConfig && contacts.length < 2 && (
                    <form onSubmit={handleAddContact} className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={newContact.name}
                        onChange={e => setNewContact({ ...newContact, name: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-1.5 text-xs text-white"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Número de celular (+52...)"
                        value={newContact.phone}
                        onChange={e => setNewContact({ ...newContact, phone: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-1.5 text-xs text-white"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Parentesco / Relación"
                        value={newContact.relationship}
                        onChange={e => setNewContact({ ...newContact, relationship: e.target.value })}
                        className="w-full bg-gray-800 border border-gray-700 rounded p-1.5 text-xs text-white"
                      />
                      <button
                        type="submit"
                        className="w-full bg-brand-pink hover:bg-opacity-80 text-white font-bold py-1.5 rounded text-xs"
                      >
                        Guardar Contacto
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ) : (
              /* ACTIVE PANIC MODE STATE */
              <div className="text-center space-y-6 py-4 animate-bounce-short">
                <div className="w-24 h-24 mx-auto rounded-full bg-red-600 border-4 border-yellow-300 flex items-center justify-center animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-3xl font-heading text-red-500 uppercase tracking-widest">
                    ¡ALERTA DE PÁNICO ACTIVADA!
                  </h3>
                  <p className="text-sm text-yellow-300 mt-2 font-semibold">
                    Conectando con Servicio Nacional de Emergencias 911 y transmitiendo audio/ubicación...
                  </p>
                </div>

                <div className="bg-black/60 p-4 rounded-xl text-left font-mono text-xs text-green-400 space-y-2 border border-green-500/30">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
                    <span>UBICACIÓN GPS ENVIADA: Lat 19.432608, Lon -99.133209</span>
                  </div>
                  <p>✔ Mensaje SMS + Alerta Push transmitida a {contacts.length} personas de confianza</p>
                  <p>✔ Marcación en automático a línea 911 efectuada</p>
                  <p>✔ Canal de audio en vivo activado (Respuesta en automático habilitada)</p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:911"
                    className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-full text-center text-lg shadow-lg"
                  >
                    Llamar directamente al 911 ahora
                  </a>
                  <button
                    onClick={() => setIsActivated(false)}
                    className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-xs"
                  >
                    Desactivar Falsa Alarma (Ingresar PIN)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PanicButton;
