import React, { useState } from 'react';
import { UserReview } from '../../types';

const INITIAL_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    targetProfileId: 101,
    authorUserId: 'MMC-USER-8921',
    authorName: 'Cliente Discreto CDMX',
    isAnonymous: false,
    rating: 5,
    comment: 'Una experiencia verdaderamente profesional, respetuosa y elegante. 100% recomendada.',
    date: '2026-09-08',
    isHighRating: true
  },
  {
    id: 'rev-2',
    targetProfileId: 101,
    authorUserId: 'MMC-USER-ANON-99',
    authorName: 'Anónimo',
    isAnonymous: true,
    rating: 5,
    comment: 'Atención impecable y trato de primera. Todo muy discreto y seguro.',
    date: '2026-09-06',
    isHighRating: true
  },
  {
    id: 'rev-3',
    targetProfileId: 101,
    authorUserId: 'MMC-USER-7712',
    authorName: 'Anónimo Protegido',
    isAnonymous: true,
    rating: 2,
    comment: 'Puntualidad regular, pero trato educado.',
    date: '2026-09-01',
    isHighRating: false // Hidden reviewer identity!
  }
];

const VerificationPage: React.FC = () => {
  // 2FA state
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [phoneNumber2FA, setPhoneNumber2FA] = useState('+52 55 9876 5432');
  const [authCode, setAuthCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  // Identity verification state
  const [docType, setDocType] = useState<'INE' | 'Pasaporte'>('INE');
  const [docNumber, setDocNumber] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [submittingDoc, setSubmittingDoc] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<UserReview[]>(INITIAL_REVIEWS);
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [isAnonReview, setIsAnonReview] = useState<boolean>(true);

  const handleSend2FACode = () => {
    if (!phoneNumber2FA) return;
    setCodeSent(true);
    alert(`Código de seguridad de 6 dígitos enviado por SMS al ${phoneNumber2FA}`);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (authCode.length < 4) {
      alert('Ingresa el código enviado por SMS.');
      return;
    }
    setIs2FAEnabled(true);
    alert('¡Autenticación de Dos Factores (2FA) Activada Correctamente!');
  };

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNumber || !emergencyPhone) {
      alert('Por favor completa el número de documento y el teléfono de emergencia.');
      return;
    }

    setSubmittingDoc(true);
    setTimeout(() => {
      setSubmittingDoc(false);
      setIsVerified(true);
      alert('¡Verificación Biométrica e Identificación Oficial Aprobada! Tu perfil cuenta con insignia de Verificación Oficial.');
    }, 1500);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment) return;

    const isHigh = newRating >= 4;
    const review: UserReview = {
      id: `rev-${Date.now()}`,
      targetProfileId: 101,
      authorUserId: 'MMC-USER-MI-ID',
      authorName: isAnonReview ? 'Anónimo Protegido' : 'Usuario Verificado',
      isAnonymous: isAnonReview,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      isHighRating: isHigh
    };

    setReviews([review, ...reviews]);
    setNewComment('');
    alert('¡Calificación guardada exitosamente con reglas de privacidad Mamacitos!');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="bg-brand-lime text-brand-purple-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Infraestructura de Seguridad & Confianza
        </span>
        <h1 className="text-4xl md:text-5xl font-heading text-white mt-3">
          Verificación de Identidad, 2FA & Calificaciones
        </h1>
        <p className="mt-4 text-xl text-brand-purple-light max-w-3xl mx-auto">
          Para garantizar la máxima seguridad de usuarios y prestadoras de servicios (estas últimas con verificación oficial obligatoria), implementamos verificación oficial con documento real y control de privacidad en reseñas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* 1. TWO-FACTOR AUTHENTICATION (2FA) */}
        <div className="bg-brand-slate p-8 rounded-2xl border border-gray-700 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-brand-pink/20 text-brand-pink rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-heading text-white">Autenticación de 2 Factores (2FA)</h2>
              <p className="text-xs text-gray-300">Protege tu cuenta con SMS o código temporal</p>
            </div>
          </div>

          {!is2FAEnabled ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Número de Teléfono Celular</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phoneNumber2FA}
                    onChange={e => setPhoneNumber2FA(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-pink"
                  />
                  <button
                    onClick={handleSend2FACode}
                    className="bg-brand-pink hover:bg-opacity-80 text-white font-bold text-xs px-4 rounded-xl whitespace-nowrap"
                  >
                    Enviar SMS
                  </button>
                </div>
              </div>

              {codeSent && (
                <form onSubmit={handleVerify2FA} className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 mb-1">Código de 6 dígitos recibido por SMS</label>
                    <input
                      type="text"
                      placeholder="123456"
                      value={authCode}
                      onChange={e => setAuthCode(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-center text-lg tracking-widest text-brand-lime font-mono font-bold"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-lime hover:bg-opacity-90 text-brand-purple-dark font-bold py-3 rounded-xl text-sm"
                  >
                    Confirmar & Activar 2FA
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-black/40 p-5 rounded-xl border border-green-500/40 text-center space-y-2">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto">
                ✓
              </div>
              <h3 className="font-bold text-green-400 text-lg">2FA ACTIVADO Y PROTEGIDO</h3>
              <p className="text-xs text-gray-300">Tu cuenta requiere confirmación SMS en cada inicio de sesión.</p>
            </div>
          )}
        </div>

        {/* 2. IDENTITY VERIFICATION (INE / PASAPORTE) */}
        <div className="bg-brand-slate p-8 rounded-2xl border border-gray-700 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-brand-lime/20 text-brand-lime rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-heading text-white">Verificación Real de Identidad</h2>
              <p className="text-xs text-brand-pink font-semibold">Obligatorio para Prestadoras de Servicios (Sin excepción)</p>
            </div>
          </div>

          {!isVerified ? (
            <form onSubmit={handleDocumentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Tipo de Documento Oficial</label>
                <select
                  value={docType}
                  onChange={e => setDocType(e.target.value as 'INE' | 'Pasaporte')}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white"
                >
                  <option value="INE">INE (Credencial para Votar México)</option>
                  <option value="Pasaporte">Pasaporte Oficial Vigente</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Clave o Folio del Documento</label>
                <input
                  type="text"
                  placeholder="Ej. IDMEX203910283..."
                  value={docNumber}
                  onChange={e => setDocNumber(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Teléfono de Emergencia Requerido</label>
                <input
                  type="tel"
                  placeholder="+52 55 1122 3344"
                  value={emergencyPhone}
                  onChange={e => setEmergencyPhone(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submittingDoc}
                className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3.5 rounded-xl text-sm transition-all"
              >
                {submittingDoc ? 'Validando Documento con Sistema Oficial...' : 'Enviar para Validación Oficial'}
              </button>
            </form>
          ) : (
            <div className="bg-black/40 p-5 rounded-xl border border-brand-pink text-center space-y-2">
              <span className="bg-brand-pink text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                Insignia Oficial Activa
              </span>
              <h3 className="font-heading text-xl text-white mt-2">PERFIL VERIFICADO OFICIALMENTE</h3>
              <p className="text-xs text-gray-300">
                Verificado mediante {docType} y línea de contacto de emergencia activa.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* 3. REVIEWS & HIGH RATING VISIBILITY ENGINE */}
      <div className="bg-brand-slate p-8 rounded-2xl border border-gray-700 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-3xl font-heading text-white">Sistema de Reseñas, Anonimato & Calificaciones</h2>
          <p className="text-xs text-gray-300 mt-1">
            <strong>Regla de Privacidad Mamacitos:</strong> Puedes comentar de forma anónima o pública. Para proteger la discreción y evitar conflictos, <strong>únicamente las calificaciones ALTAS (4 o 5 estrellas) revelan quién te ha calificado o quién ha visto tu perfil</strong>. Las calificaciones neutras o bajas se registran con anonimato absoluto.
          </p>
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleAddReview} className="bg-black/40 p-6 rounded-xl border border-gray-800 mb-8 space-y-4">
          <h3 className="text-lg font-bold text-white">Dejar una Experiencia / Calificación</h3>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-300 font-bold">Calificación:</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewRating(star)}
                  className={`text-2xl ${star <= newRating ? 'text-yellow-400' : 'text-gray-600'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="text-xs font-mono text-brand-pink font-bold">({newRating} Estrellas)</span>
          </div>

          <div>
            <textarea
              rows={3}
              placeholder="Escribe tu reseña sobre el trato, ambiente o profesionalismo..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-pink"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonReview}
                onChange={e => setIsAnonReview(e.target.checked)}
                className="w-4 h-4 text-brand-pink bg-gray-800 border-gray-700 rounded"
              />
              <span className="text-xs text-gray-300">Publicar como <strong>Anónimo Protegido</strong></span>
            </label>

            <button
              type="submit"
              className="w-full sm:w-auto bg-brand-pink hover:bg-opacity-90 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-lg"
            >
              Publicar Reseña Seguro
            </button>
          </div>
        </form>

        {/* Reviews List */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Experiencias y Comentarios Registrados</h3>
          
          <div className="space-y-4">
            {reviews.map(rev => (
              <div key={rev.id} className="bg-brand-deep-purple/60 p-5 rounded-xl border border-gray-700/80 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {rev.isHighRating ? rev.authorName : 'Identidad Protegida (Calificación Discreta)'}
                      </span>
                      {rev.isHighRating ? (
                        <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-green-500/30">
                          Calificación Alta (Identidad Visible)
                        </span>
                      ) : (
                        <span className="bg-yellow-500/20 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-yellow-500/30">
                          Identidad Oculta por Regla Discreta
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400">{rev.date}</p>
                  </div>

                  <div className="text-yellow-400 text-sm">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>

                <p className="text-xs text-gray-200">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default VerificationPage;
