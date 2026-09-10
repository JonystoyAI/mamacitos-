import React, { useState } from 'react';
import { ContentItem } from '../../types';
import CreatorMetricsDashboard from '../creator/CreatorMetricsDashboard';

const INITIAL_CONTENT: ContentItem[] = [
  {
    id: 'cnt-101',
    creatorId: 101,
    creatorUserId: 'MMC-LUNA-98',
    creatorName: 'Luna Trans VIP',
    title: 'Set Exclusivo Lencería & Sesión Privada CDMX',
    description: '15 fotografías en alta resolución + video exclusivo de 3 min. Acceso de lectura rápida sin intermediarios.',
    price: 350,
    previewImage: 'https://picsum.photos/seed/content1/600/400?blur=5',
    lockedMediaUrl: 'https://mega.nz/file/sample-secure-vault-luna-01',
    unlockDurationHours: 24, // 24 hours view
    allowDownload: false,
    isViewOnceOnly: true,
    externalPlatformLink: 'https://mega.nz/folder/luna-private-vault-01',
    tags: ['Fotos HD', 'Video Exclusivo', 'Ver Una Vez'],
    createdAt: '2026-09-08'
  },
  {
    id: 'cnt-102',
    creatorId: 102,
    creatorUserId: 'MMC-VALEN-44',
    creatorName: 'Valentina Premium',
    title: 'Masterclass de Estilo, Modelaje & Contenido Sensual',
    description: 'Guía en video de 25 minutos con tips de fotografía, iluminación y poses profesionales para creadoras.',
    price: 600,
    previewImage: 'https://picsum.photos/seed/content2/600/400?blur=4',
    lockedMediaUrl: 'https://drive.google.com/file/d/sample-valentina-masterclass',
    unlockDurationHours: 168, // 7 days
    allowDownload: true,
    isViewOnceOnly: false,
    externalPlatformLink: 'https://drive.google.com/drive/folders/valentina-masterclass-2026',
    tags: ['Descargable', 'Video HD', 'Pase 7 Días'],
    createdAt: '2026-09-07'
  },
  {
    id: 'cnt-103',
    creatorId: 103,
    creatorUserId: 'MMC-ROSA-12',
    creatorName: 'Rosalía Trans Glam',
    title: 'Pack Detrás de Cámaras Backstage Show',
    description: 'Contenido inédito detrás de escena de la última presentación en vivo. 10 fotos + 2 clips de audio.',
    price: 250,
    previewImage: 'https://picsum.photos/seed/content3/600/400?blur=6',
    lockedMediaUrl: 'https://dropbox.com/sh/sample-rosalia-backstage',
    unlockDurationHours: 0, // Permanent
    allowDownload: false,
    isViewOnceOnly: true,
    externalPlatformLink: 'https://dropbox.com/sh/rosalia-exclusive-backstage-2026',
    tags: ['Backstage', 'Audio', 'Ver Una Vez'],
    createdAt: '2026-09-05'
  }
];

const ComparteContenidoPage: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>(INITIAL_CONTENT);
  const [activeTab, setActiveTab] = useState<'browse' | 'create' | 'unlocked' | 'metrics'>('browse');
  const [unlockedItemIds, setUnlockedItemIds] = useState<string[]>([]);
  const [isVipSubscriber, setIsVipSubscriber] = useState<boolean>(false);
  const [selectedItemForPurchase, setSelectedItemForPurchase] = useState<ContentItem | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [showSubscriptionGateModal, setShowSubscriptionGateModal] = useState<ContentItem | null>(null);

  // New Content Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState(300);
  const [newDuration, setNewDuration] = useState(24);
  const [newAllowDownload, setNewAllowDownload] = useState(false);
  const [newLink, setNewLink] = useState('');

  const handleCreateContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLink) {
      alert('Por favor completa el título y el enlace de liberación.');
      return;
    }

    const newItem: ContentItem = {
      id: `cnt-${Date.now()}`,
      creatorId: 999,
      creatorUserId: 'MMC-MI-PERFIL-01',
      creatorName: 'Mi Perfil de Creadora',
      title: newTitle,
      description: newDescription || 'Contenido exclusivo publicado en Mamacitos.',
      price: Number(newPrice),
      previewImage: 'https://picsum.photos/seed/mycontent/600/400',
      lockedMediaUrl: newLink,
      unlockDurationHours: Number(newDuration),
      allowDownload: newAllowDownload,
      isViewOnceOnly: !newAllowDownload,
      externalPlatformLink: newLink,
      tags: [newAllowDownload ? 'Descargable' : 'Ver Una Vez', `${newDuration}h Acceso`],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setItems([newItem, ...items]);
    setActiveTab('browse');
    alert('¡Tu contenido ha sido publicado exitosamente! Los usuarios podrán desbloquear el link mediante pago discreto.');
    // Reset
    setNewTitle('');
    setNewDescription('');
    setNewPrice(300);
    setNewLink('');
  };

  const executeDiscreetPurchase = (item: ContentItem) => {
    setPurchasing(true);
    setTimeout(() => {
      setUnlockedItemIds([...unlockedItemIds, item.id]);
      setPurchasing(false);
      setSelectedItemForPurchase(null);
    }, 1200);
  };

  const handleActivateVipSubscription = () => {
    setIsVipSubscriber(true);
    setShowSubscriptionGateModal(null);
    alert('¡Suscripción VIP Activada! Ahora tienes acceso para previsualizar contenido sin censura en toda la plataforma.');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-deep-purple via-brand-purple to-brand-slate rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl border border-brand-pink/30">
        <div className="relative z-10">
          <span className="bg-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
            Sustituto de Armario Virtual
          </span>
          <h1 className="text-4xl md:text-5xl font-heading text-white mt-3">
            Comparte Contenido & Venta Directa
          </h1>
          <p className="mt-3 text-lg text-brand-purple-light max-w-3xl mx-auto">
            Gana libertad vendiendo tu contenido digital al precio que desees. Libera el link a tu almacenamiento externo de forma <strong>100% discreta</strong> sin dar tu número telefónico.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === 'browse'
                  ? 'bg-brand-pink text-white shadow-lg'
                  : 'bg-black/40 text-gray-300 hover:text-white'
              }`}
            >
              Explorar Catálogo ({items.length})
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'create'
                  ? 'bg-brand-lime text-brand-purple-dark shadow-lg'
                  : 'bg-brand-lime/20 text-brand-lime border border-brand-lime/40 hover:bg-brand-lime/30'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Publicar Mi Contenido (Fijar Precio)
            </button>
            <button
              onClick={() => setActiveTab('unlocked')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === 'unlocked'
                  ? 'bg-brand-pink text-white shadow-lg'
                  : 'bg-black/40 text-gray-300 hover:text-white'
              }`}
            >
              Mis Desbloqueos ({unlockedItemIds.length})
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === 'metrics'
                  ? 'bg-brand-pink text-white shadow-lg'
                  : 'bg-black/40 text-gray-300 hover:text-white'
              }`}
            >
              <span>📊</span>
              <span>Panel de Métricas & Bóveda</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subscription Status Bar */}
      <div className="bg-brand-slate p-4 rounded-2xl border border-gray-700/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${isVipSubscriber ? 'bg-brand-lime/20 text-brand-lime' : 'bg-gray-800 text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Estado de Suscripción:</span>
              {isVipSubscriber ? (
                <span className="bg-brand-lime text-brand-purple-dark text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow">
                  ★ Membresía VIP Activa
                </span>
              ) : (
                <span className="bg-gray-800 text-gray-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-gray-700">
                  Gratuito / No Suscrito
                </span>
              )}
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              {isVipSubscriber
                ? 'Tienes pase libre para previsualizar fotos sin censura y desbloquear enlaces.'
                : 'Las vistas previas están difuminadas. Activa VIP o compra sets de forma individual.'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (isVipSubscriber) {
              setIsVipSubscriber(false);
              alert('Suscripción cambiada a Gratuita (Modo Prueba).');
            } else {
              handleActivateVipSubscription();
            }
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-md ${
            isVipSubscriber
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
              : 'bg-brand-pink hover:bg-opacity-90 text-white'
          }`}
        >
          {isVipSubscriber ? 'Desactivar VIP (Prueba)' : '★ Activar Suscripción VIP ($199 MXN)'}
        </button>
      </div>

      {/* TAB 1: BROWSE CATALOG */}
      {activeTab === 'browse' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => {
              const isUnlocked = unlockedItemIds.includes(item.id) || isVipSubscriber;

              return (
                <div key={item.id} className="bg-brand-slate rounded-2xl overflow-hidden border border-gray-700/60 shadow-xl flex flex-col justify-between hover:border-brand-pink/50 transition-all group">
                  <div>
                    {/* Media Container with Dynamic Blur & Unlock Overlay */}
                    <div className="relative h-64 bg-black overflow-hidden">
                      <img
                        src={item.previewImage}
                        alt={item.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          !isUnlocked
                            ? 'filter blur-xl scale-110 opacity-60 group-hover:scale-125'
                            : 'filter-none opacity-100 scale-100'
                        }`}
                      />
                      
                      {/* BLUR & UNLOCK OVERLAY (For Non-Subscribers / Locked) */}
                      {!isUnlocked ? (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-between p-5 text-center transition-all">
                          
                          <div className="pt-2">
                            <span className="bg-red-950/80 text-red-400 border border-red-500/40 text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow">
                              <span>🔒</span> CONTENIDO CENSURADO / VIP
                            </span>
                          </div>

                          <div className="space-y-1.5 my-auto">
                            <div className="w-12 h-12 rounded-full bg-brand-pink/20 border-2 border-brand-pink flex items-center justify-center mx-auto shadow-lg shadow-brand-pink/30 animate-pulse">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            </div>
                            <h4 className="text-white font-heading text-lg">MAMACITOS UNCENSORED</h4>
                            <p className="text-[11px] text-gray-300 max-w-xs mx-auto leading-tight">
                              Requiere Verificación de Suscripción VIP o Pago Discreto Individual.
                            </p>
                            <span className="text-2xl font-heading text-brand-lime block mt-1">${item.price} MXN</span>
                          </div>

                          <div className="w-full space-y-2 pt-1">
                            <button
                              onClick={() => setSelectedItemForPurchase(item)}
                              className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                            >
                              🔓 Desbloquear Set ($${item.price} MXN)
                            </button>

                            <button
                              onClick={() => setShowSubscriptionGateModal(item)}
                              className="w-full bg-brand-lime hover:bg-opacity-90 text-brand-purple-dark font-extrabold py-2 px-3 rounded-xl text-[11px] transition-all flex items-center justify-center gap-1 shadow"
                            >
                              ★ Verificación VIP ($199/mes)
                            </button>
                          </div>

                        </div>
                      ) : (
                        /* UNLOCKED / SUBSCRIBER BADGE */
                        <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <span className="bg-green-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg border border-green-400/40">
                              ✓ {isVipSubscriber ? 'ACCESO VIP SUSCRIPTOR' : 'SET DESBLOQUEADO'}
                            </span>
                            <span className="bg-black/70 text-gray-200 text-[10px] font-mono px-2.5 py-1 rounded-md border border-gray-600">
                              ID: {item.creatorUserId}
                            </span>
                          </div>

                          <div className="bg-black/60 text-brand-lime text-[9px] font-mono px-2 py-0.5 rounded self-start border border-brand-lime/30">
                            © MAMACITOS UNLOCKED MEDIA
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Content Details */}
                    <div className="p-5">
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white line-clamp-1">{item.title}</h3>
                      </div>
                      
                      <p className="text-xs text-gray-300 line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      {/* Content Rules & Restrictions */}
                      <div className="bg-black/30 p-3 rounded-xl space-y-1.5 text-[11px] border border-gray-800 mb-4">
                        <div className="flex justify-between text-gray-300">
                          <span>Duración de Desbloqueo:</span>
                          <strong className="text-brand-pink font-semibold">
                            {item.unlockDurationHours === 0 ? 'Sin límite (Permanente)' : `${item.unlockDurationHours} Horas`}
                          </strong>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Permiso de Descarga:</span>
                          <strong className={item.allowDownload ? 'text-green-400' : 'text-yellow-400'}>
                            {item.allowDownload ? 'Permitida' : 'Solo lectura / Ver una vez'}
                          </strong>
                        </div>
                        <div className="flex justify-between text-gray-300">
                          <span>Contacto Directo:</span>
                          <strong className="text-gray-400">Protegido por Mamacitos (Sin Teléfono)</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-5 pt-0">
                    {!isUnlocked ? (
                      <button
                        onClick={() => setSelectedItemForPurchase(item)}
                        className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                        Desbloquear por ${item.price} MXN (Pago Discreto)
                      </button>
                    ) : (
                      <a
                        href={item.externalPlatformLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 text-center"
                      >
                        Abrir Enlace Liberado Seguro ➔
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CREATE CONTENT & SET RESTRICTIONS */}
      {activeTab === 'create' && (
        <div className="max-w-2xl mx-auto bg-brand-slate p-8 rounded-2xl border border-gray-700 shadow-2xl">
          <h2 className="text-2xl font-heading text-white mb-2">Publicar Contenido con Pago Discreto</h2>
          <p className="text-xs text-gray-300 mb-6">
            Fija el precio, restricción de lectura y sube el enlace seguro de tu plataforma de almacenamiento (Mega, Google Drive, Dropbox, etc.). Mamacitos entregará el enlace únicamente tras el pago.
          </p>

          <form onSubmit={handleCreateContent} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Título de la Publicación / Set</label>
              <input
                type="text"
                placeholder="Ej. Set Especial CDMX Lencería + Video 4K"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-pink"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Descripción de lo que incluye</label>
              <textarea
                rows={3}
                placeholder="Detalla fotos, duración de videos o extras..."
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Tu Precio Personal ($ MXN)</label>
                <input
                  type="number"
                  min="50"
                  step="50"
                  value={newPrice}
                  onChange={e => setNewPrice(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-brand-lime font-bold focus:outline-none focus:border-brand-pink"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Tiempo de Desbloqueo Activo</label>
                <select
                  value={newDuration}
                  onChange={e => setNewDuration(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-pink"
                >
                  <option value={24}>24 Horas (Acceso Rápido)</option>
                  <option value={168}>7 Días (Pase Semanal)</option>
                  <option value={0}>Sin límite (Acceso Permanente)</option>
                </select>
              </div>
            </div>

            {/* Restrictions */}
            <div className="bg-brand-deep-purple/60 p-4 rounded-xl border border-brand-purple-light/20">
              <label className="block text-xs font-bold text-brand-pink mb-2">Restricciones de Descarga y Copia</label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newAllowDownload}
                  onChange={e => setNewAllowDownload(e.target.checked)}
                  className="w-4 h-4 text-brand-pink bg-gray-800 border-gray-600 rounded focus:ring-brand-pink"
                />
                <span className="text-xs text-gray-200">
                  Permitir descarga directa del archivo (Si está desmarcado, el usuario solo podrá verlo de una sola vez).
                </span>
              </label>
            </div>

            {/* Storage Link */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                Enlace Directo a tu Plataforma de Almacenamiento (Mega, Drive, Dropbox, etc.)
              </label>
              <input
                type="url"
                placeholder="https://mega.nz/folder/tu-enlace-privado..."
                value={newLink}
                onChange={e => setNewLink(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-brand-pink"
                required
              />
              <p className="text-[11px] text-gray-400 mt-1">
                * Tu enlace se mantendrá oculto y protegido. Solo se liberará al usuario que realice el pago discreto con ID de Usuario.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3.5 px-6 rounded-xl text-base transition-transform transform hover:scale-[1.01] shadow-lg"
            >
              Publicar Contenido y Generar Link Discreto
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: UNLOCKED CONTENT */}
      {activeTab === 'unlocked' && (
        <div>
          {unlockedItemIds.length === 0 && !isVipSubscriber ? (
            <div className="text-center py-16 bg-brand-slate rounded-2xl border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">No has desbloqueado contenido aún</h3>
              <p className="text-gray-400 text-sm mb-4">Explora el catálogo para liberar enlaces mediante pago discreto o activa tu Membresía VIP.</p>
              <button
                onClick={() => setActiveTab('browse')}
                className="bg-brand-pink text-white font-bold py-2.5 px-6 rounded-full text-sm"
              >
                Ir al Catálogo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.filter(i => unlockedItemIds.includes(i.id) || isVipSubscriber).map(item => (
                <div key={item.id} className="bg-brand-slate p-6 rounded-2xl border border-green-500/40 shadow-xl">
                  <span className="text-xs font-mono text-green-400 bg-green-500/10 px-2.5 py-1 rounded-md border border-green-500/30">
                    {isVipSubscriber ? 'ACCESO VIP TOTAL' : 'LINK LIBERADO'}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3">{item.title}</h3>
                  <p className="text-xs text-gray-300 mt-1 mb-4">{item.description}</p>
                  
                  <div className="bg-black/50 p-3 rounded-xl mb-4 font-mono text-xs text-gray-300 break-all border border-gray-700">
                    {item.externalPlatformLink}
                  </div>

                  <a
                    href={item.externalPlatformLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl text-center text-sm"
                  >
                    Abrir Contenido Ahora ➔
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CREATOR METRICS & PAYOUTS DASHBOARD */}
      {activeTab === 'metrics' && (
        <CreatorMetricsDashboard />
      )}

      {/* SUBSCRIPTION GATE CHECK MODAL */}
      {showSubscriptionGateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-brand-deep-purple border-2 border-brand-lime/60 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative text-center">
            <button
              onClick={() => setShowSubscriptionGateModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <span className="bg-brand-lime text-brand-purple-dark text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Verificación de Suscripción VIP
            </span>

            <h3 className="text-2xl font-heading text-white mt-3 mb-2">
              Desbloquea Todo el Contenido Sin Censura
            </h3>

            <p className="text-xs text-gray-300 mb-6 leading-relaxed">
              La vista previa de <strong className="text-brand-pink">{showSubscriptionGateModal.title}</strong> está censurada. Con la Membresía VIP Mamacitos ($199 MXN/mes) obtienes acceso ilimitado para previsualizar todas las imágenes en HD sin filtro.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleActivateVipSubscription}
                className="w-full bg-brand-lime hover:bg-opacity-90 text-brand-purple-dark font-extrabold py-3.5 px-6 rounded-xl text-sm shadow-xl transition-all"
              >
                ★ Activar Suscripción VIP ($199 MXN / Mes)
              </button>

              <button
                onClick={() => {
                  setSelectedItemForPurchase(showSubscriptionGateModal);
                  setShowSubscriptionGateModal(null);
                }}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl text-xs border border-gray-700"
              >
                Comprar Solo Este Set ($${showSubscriptionGateModal.price} MXN)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCREET PURCHASE MODAL */}
      {selectedItemForPurchase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-brand-deep-purple border border-brand-pink/60 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl relative">
            <button
              onClick={() => setSelectedItemForPurchase(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <span className="bg-brand-pink text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Pago Discreto por ID de Usuario
            </span>

            <h3 className="text-2xl font-heading text-white mt-2 mb-1">{selectedItemForPurchase.title}</h3>
            <p className="text-xs text-gray-300 mb-4">Creadora: {selectedItemForPurchase.creatorName} ({selectedItemForPurchase.creatorUserId})</p>

            <div className="bg-black/40 p-4 rounded-xl border border-gray-700 space-y-2 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Tu ID de Usuario Pagador:</span>
                <span className="font-mono text-brand-pink font-bold">MMC-USER-8921 (Anónimo)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ID del Vendedor:</span>
                <span className="font-mono text-gray-200">{selectedItemForPurchase.creatorUserId}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-800">
                <span className="text-gray-200 font-bold">Monto a Pagar:</span>
                <span className="text-lg font-heading text-brand-lime">${selectedItemForPurchase.price} MXN</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">
              * Ninguno de los dos sabrá datos personales del otro (ni nombre real, ni banco, ni número telefónico). Mamacitos procesa y acredita la transferencia inmediatamente de ID a ID.
            </p>

            <button
              onClick={() => executeDiscreetPurchase(selectedItemForPurchase)}
              disabled={purchasing}
              className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3.5 px-6 rounded-xl text-base transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {purchasing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando Pago Discreto por ID...
                </>
              ) : (
                `Confirmar Pago Discreto ($${selectedItemForPurchase.price} MXN)`
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparteContenidoPage;
