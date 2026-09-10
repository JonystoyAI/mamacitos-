import React, { useState } from 'react';
import { Star, ShieldCheck, Lock, Eye, EyeOff, MessageSquare, ThumbsUp, AlertTriangle, CheckCircle2, UserX, Send, Sparkles, Filter, ChevronDown, Check } from 'lucide-react';
import { UserReview } from '../../types';
import VerifiedBadge from '../common/VerifiedBadge';

interface AnonymousReviewManagerProps {
  providerId: number | string;
  providerName: string;
  isVerified: boolean;
  userIdCode?: string;
  isOwnerView?: boolean; // If true, rendering provider dashboard mode
  onNavigateToVerification?: () => void;
}

const INITIAL_MOCK_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    targetProfileId: '101',
    authorName: 'Usuario Anónimo',
    isAnonymous: true,
    rating: 5,
    punctualityScore: 5,
    veracityScore: 5,
    treatmentScore: 5,
    comment: 'Excelente atención, sumamente puntual y las fotos son 100% reales. Todo fue muy profesional y discreto.',
    date: 'Hace 2 días',
    isHighRating: true,
    isNegative: false,
    isPubliclyVisible: true,
    verifiedBooking: true,
    providerResponse: '¡Muchas gracias por tu reseña y confianza! Siempre es un placer brindar un trato excelente.'
  },
  {
    id: 'rev-2',
    targetProfileId: '101',
    authorName: 'Cliente #882',
    isAnonymous: true,
    rating: 5,
    punctualityScore: 5,
    veracityScore: 4,
    treatmentScore: 5,
    comment: 'Instalaciones muy limpias y un ambiente súper seguro. Recomendada totalmente.',
    date: 'Hace 5 días',
    isHighRating: true,
    isNegative: false,
    isPubliclyVisible: true,
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    targetProfileId: '101',
    authorName: 'Usuario Anónimo',
    isAnonymous: true,
    rating: 2,
    punctualityScore: 2,
    veracityScore: 3,
    treatmentScore: 3,
    comment: 'Llegó 20 minutos tarde a la cita. El trato fue amable pero la puntualidad afectó la experiencia.',
    date: 'Hace 1 semana',
    isHighRating: false,
    isNegative: true,
    isPubliclyVisible: false, // Hidden by default from public view because rating <= 3!
    verifiedBooking: false,
    providerResponse: 'Agradezco el comentario. Tuve un retraso imprevisto en el tráfico, pero ya reajusté mis horarios.'
  },
  {
    id: 'rev-4',
    targetProfileId: '101',
    authorName: 'Anónimo VIP',
    isAnonymous: true,
    rating: 4,
    punctualityScore: 4,
    veracityScore: 5,
    treatmentScore: 4,
    comment: 'Buena comunicación en WhatsApp antes de la cita. Muy respetuosa.',
    date: 'Hace 2 semanas',
    isHighRating: true,
    isNegative: false,
    isPubliclyVisible: true,
    verifiedBooking: true
  },
  {
    id: 'rev-5',
    targetProfileId: '101',
    authorName: 'Usuario Anónimo',
    isAnonymous: true,
    rating: 1,
    punctualityScore: 1,
    veracityScore: 2,
    treatmentScore: 2,
    comment: 'Canceló de último minuto sin previo aviso.',
    date: 'Hace 3 semanas',
    isHighRating: false,
    isNegative: true,
    isPubliclyVisible: false, // Hidden by default
    verifiedBooking: false
  }
];

export const AnonymousReviewManager: React.FC<AnonymousReviewManagerProps> = ({
  providerId,
  providerName,
  isVerified,
  userIdCode = 'MMC-9821',
  isOwnerView = true,
  onNavigateToVerification
}) => {
  const [reviews, setReviews] = useState<UserReview[]>(INITIAL_MOCK_REVIEWS);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'public_feed' | 'leave_review'>('dashboard');
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'public' | 'hidden'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New review form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newPunctuality, setNewPunctuality] = useState<number>(5);
  const [newVeracity, setNewVeracity] = useState<number>(5);
  const [newTreatment, setNewTreatment] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [isAnonymousSubmit, setIsAnonymousSubmit] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Response modal / state
  const [respondingReviewId, setRespondingReviewId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle public visibility of negative feedback
  const toggleReviewVisibility = (reviewId: string) => {
    if (!isVerified) {
      showToast('🔒 Para gestionar opiniones debes verificar tu cuenta con INE o Pasaporte.');
      return;
    }

    setReviews(prev =>
      prev.map(rev => {
        if (rev.id === reviewId) {
          const nextState = !rev.isPubliclyVisible;
          showToast(
            nextState
              ? '👁️ Reseña configurada como VISIBLE en tu perfil público.'
              : '🙈 Reseña OCULTA de tu perfil público.'
          );
          return { ...rev, isPubliclyVisible: nextState };
        }
        return rev;
      })
    );
  };

  // Save provider response
  const handleSaveResponse = (reviewId: string) => {
    if (!responseText.trim()) return;
    setReviews(prev =>
      prev.map(rev => (rev.id === reviewId ? { ...rev, providerResponse: responseText } : rev))
    );
    showToast('💬 Respuesta publicada con éxito en la valoración.');
    setRespondingReviewId(null);
    setResponseText('');
  };

  // Submit new anonymous review
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) {
      showToast('⚠️ Por favor escribe un comentario para tu valoración.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const isNegative = newRating <= 3;
      const createdReview: UserReview = {
        id: `rev-${Date.now()}`,
        targetProfileId: providerId,
        authorName: isAnonymousSubmit ? 'Usuario Anónimo' : 'Cliente Verificado',
        isAnonymous: isAnonymousSubmit,
        rating: newRating,
        punctualityScore: newPunctuality,
        veracityScore: newVeracity,
        treatmentScore: newTreatment,
        comment: newComment,
        date: 'Ahora mismo',
        isHighRating: newRating >= 4,
        isNegative: isNegative,
        // Negative reviews default to hidden!
        isPubliclyVisible: !isNegative,
        verifiedBooking: true
      };

      setReviews(prev => [createdReview, ...prev]);
      setIsSubmitting(false);
      setNewComment('');

      if (isNegative) {
        showToast('✍️ Reseña enviada anónimamente. Por ser una valoración de 3 estrellas o menos, el proveedor la revisará en su panel privado.');
      } else {
        showToast('🌟 ¡Reseña enviada anónimamente con éxito! Ya es visible en el perfil público.');
      }

      setActiveTab('public_feed');
    }, 600);
  };

  // Computed metrics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1) : '5.0';
  const avgPunctuality = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + (r.punctualityScore || 5), 0) / totalReviews).toFixed(1) : '5.0';
  const avgVeracity = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + (r.veracityScore || 5), 0) / totalReviews).toFixed(1) : '5.0';
  const avgTreatment = totalReviews > 0 ? (reviews.reduce((acc, r) => acc + (r.treatmentScore || 5), 0) / totalReviews).toFixed(1) : '5.0';
  
  const negativeReviewsCount = reviews.filter(r => r.isNegative).length;
  const hiddenReviewsCount = reviews.filter(r => !r.isPubliclyVisible).length;
  const publicReviews = reviews.filter(r => r.isPubliclyVisible);

  const filteredReviews = reviews.filter(r => {
    if (filter === 'positive') return !r.isNegative;
    if (filter === 'negative') return r.isNegative;
    if (filter === 'public') return r.isPubliclyVisible;
    if (filter === 'hidden') return !r.isPubliclyVisible;
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-black/90 text-white border border-brand-pink/60 px-4 py-3 rounded-2xl shadow-2xl text-xs font-mono flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header Tabs */}
      <div className="bg-brand-slate p-2 rounded-2xl border border-gray-700/80 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto shadow-xl">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'dashboard'
              ? 'bg-brand-pink text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Panel de Reputación Privado</span>
        </button>

        <button
          onClick={() => setActiveTab('public_feed')}
          className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'public_feed'
              ? 'bg-brand-pink text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Vista Pública ({publicReviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leave_review')}
          className={`flex-1 py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'leave_review'
              ? 'bg-brand-pink text-white shadow-lg'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          <UserX className="w-4 h-4" />
          <span>Dejar Opinión Anónima</span>
        </button>
      </div>

      {/* TAB 1: PROVIDER DASHBOARD WITH ACCOUNT VERIFICATION GATE */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* VERIFICATION LOCKED BANNER IF NOT VERIFIED */}
          {!isVerified ? (
            <div className="bg-gradient-to-r from-gray-900 via-brand-deep-purple/40 to-gray-900 p-8 rounded-3xl border border-amber-500/50 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
                <Lock className="w-8 h-8" />
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-amber-400 text-black text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                    ACCESO RESTRINGIDO
                  </span>
                </div>
                <h3 className="text-2xl font-heading text-white">
                  Valoraciones y Reseñas Bloqueadas
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Para proteger la autenticidad del servicio y evitar difamaciones, las valoraciones, comentarios detallados y controles de visibilidad <strong className="text-white">solo son accesibles para proveedores con cuenta verificada</strong> mediante documento de identidad oficial (INE o Pasaporte).
                </p>
              </div>

              {/* Locked Preview Blurred Card */}
              <div className="relative max-w-lg mx-auto bg-gray-950/80 p-6 rounded-2xl border border-gray-800 backdrop-blur-md overflow-hidden">
                <div className="filter blur-sm select-none pointer-events-none opacity-40 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">4.8 ★★★★★</span>
                    <span className="text-xs text-emerald-400 font-mono">18 Opiniones Recibidas</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded-full w-1/2"></div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 p-4">
                  <p className="text-xs text-amber-300 font-bold text-center">
                    Verifica tu ID para desbloquear tus calificaciones y gestionar reseñas públicas.
                  </p>
                  <button
                    onClick={onNavigateToVerification}
                    className="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-extrabold text-xs px-6 py-3 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Verificar mi Cuenta Ahora
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-gray-400 font-mono">
                <span>✓ Proceso 100% confidencial</span>
                <span>•</span>
                <span>✓ Validación en menos de 5 minutos</span>
              </div>
            </div>
          ) : (
            
            /* UNLOCKED FULL PROVIDER REVIEW MANAGEMENT DASHBOARD */
            <div className="space-y-6">
              
              {/* Dashboard Banner */}
              <div className="bg-gradient-to-r from-brand-slate via-brand-deep-purple to-brand-slate p-6 sm:p-8 rounded-3xl border border-gray-700/80 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <VerifiedBadge
                      isVerified={true}
                      docType="INE"
                      userIdCode={userIdCode}
                      size="sm"
                      variant="official"
                    />
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Módulo de Reputación Desbloqueado
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-heading text-white flex items-center gap-3">
                    Gestión de Opiniones de {providerName}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
                    Revisa las valoraciones anónimas de tus clientes. <strong className="text-white">Las opiniones negativas (≤3 estrellas) están ocultas por defecto del público</strong> y tú decides si deseas mostrarlas en tu perfil.
                  </p>
                </div>

                <div className="bg-black/60 p-4 rounded-2xl border border-gray-700 shrink-0 text-center min-w-[140px]">
                  <span className="text-3xl font-extrabold text-amber-400 block">{avgRating}</span>
                  <div className="flex justify-center text-amber-400 my-1">
                    {'★'.repeat(Math.round(Number(avgRating)))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{totalReviews} Opiniones Totales</span>
                </div>
              </div>

              {/* Sub-scores metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-brand-slate p-4 rounded-2xl border border-gray-700/80 shadow-lg space-y-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Puntualidad</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-white">{avgPunctuality} / 5.0</span>
                    <span className="text-xs text-amber-400 font-bold">★ {avgPunctuality}</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(Number(avgPunctuality) / 5) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bg-brand-slate p-4 rounded-2xl border border-gray-700/80 shadow-lg space-y-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Veracidad de Fotos</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-white">{avgVeracity} / 5.0</span>
                    <span className="text-xs text-amber-400 font-bold">★ {avgVeracity}</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(Number(avgVeracity) / 5) * 100}%` }}></div>
                  </div>
                </div>

                <div className="bg-brand-slate p-4 rounded-2xl border border-gray-700/80 shadow-lg space-y-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Trato & Respeto</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-white">{avgTreatment} / 5.0</span>
                    <span className="text-xs text-amber-400 font-bold">★ {avgTreatment}</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-pink h-full rounded-full" style={{ width: `${(Number(avgTreatment) / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Filtering bar for Provider */}
              <div className="bg-brand-slate rounded-3xl p-6 border border-gray-700/80 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
                  <div>
                    <h3 className="text-xl font-heading text-white">Listado de Opiniones Privadas</h3>
                    <p className="text-xs text-gray-400">
                      Gestiona la visibilidad pública de cada valoración o responde directamente.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'all' ? 'bg-brand-pink text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                      Todas ({totalReviews})
                    </button>
                    <button
                      onClick={() => setFilter('positive')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'positive' ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                      Positivas
                    </button>
                    <button
                      onClick={() => setFilter('negative')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'negative' ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                      Críticas / Negativas ({negativeReviewsCount})
                    </button>
                    <button
                      onClick={() => setFilter('hidden')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filter === 'hidden' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    >
                      Ocultas al Público ({hiddenReviewsCount})
                    </button>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {filteredReviews.map(review => (
                    <div
                      key={review.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        review.isNegative
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : 'bg-gray-900/80 border-gray-800'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-white">{review.authorName}</span>
                          <span className="bg-gray-800 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-gray-700">
                            🔒 Opinión Anónima
                          </span>

                          {review.verifiedBooking && (
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Cita Verificada
                            </span>
                          )}

                          {review.isNegative ? (
                            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Retroalimentación Crítica (≤3★)
                            </span>
                          ) : (
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              Excelente
                            </span>
                          )}
                        </div>

                        <span className="text-xs text-gray-400 font-mono">{review.date}</span>
                      </div>

                      {/* Stars & Category Ratings */}
                      <div className="flex items-center gap-4 flex-wrap text-xs">
                        <div className="flex text-amber-400 text-base">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star}>{star <= review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>

                        {review.punctualityScore && (
                          <span className="text-gray-400">Puntualidad: <strong className="text-white">{review.punctualityScore}/5</strong></span>
                        )}
                        {review.veracityScore && (
                          <span className="text-gray-400">Veracidad: <strong className="text-white">{review.veracityScore}/5</strong></span>
                        )}
                        {review.treatmentScore && (
                          <span className="text-gray-400">Trato: <strong className="text-white">{review.treatmentScore}/5</strong></span>
                        )}
                      </div>

                      {/* Comment text */}
                      <p className="text-sm text-gray-200 leading-relaxed bg-black/40 p-3 rounded-xl border border-gray-800">
                        "{review.comment}"
                      </p>

                      {/* Provider response if exists */}
                      {review.providerResponse && (
                        <div className="bg-brand-deep-purple/40 p-3 rounded-xl border border-brand-pink/30 space-y-1 text-xs">
                          <span className="text-brand-pink font-bold flex items-center gap-1">
                            💬 Tu respuesta como Proveedor:
                          </span>
                          <p className="text-gray-300 italic">"{review.providerResponse}"</p>
                        </div>
                      )}

                      {/* PRIVACY TOGGLE CONTROL FOR PROVIDER */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-gray-800/80">
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-300 font-bold">Visibilidad en Perfil Público:</span>
                          {review.isPubliclyVisible ? (
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Eye className="w-3 h-3" /> Pública
                            </span>
                          ) : (
                            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Oculta del Público
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                          <button
                            onClick={() => toggleReviewVisibility(review.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                              review.isPubliclyVisible
                                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
                                : 'bg-emerald-500 text-black font-extrabold hover:bg-emerald-400'
                            }`}
                          >
                            {review.isPubliclyVisible ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" /> Ocultar de mi Perfil
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" /> Publicar en mi Perfil
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setRespondingReviewId(review.id);
                              setResponseText(review.providerResponse || '');
                            }}
                            className="bg-brand-pink/20 hover:bg-brand-pink text-brand-pink hover:text-white border border-brand-pink/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                          >
                            {review.providerResponse ? 'Editar Respuesta' : 'Responder'}
                          </button>
                        </div>
                      </div>

                      {/* Inline Response Form */}
                      {respondingReviewId === review.id && (
                        <div className="bg-black/60 p-4 rounded-xl border border-brand-pink/50 space-y-3 mt-3 animate-fade-in">
                          <span className="text-xs font-bold text-white">Escribir respuesta oficial del proveedor:</span>
                          <textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Agradece el comentario o aclara la situación con respeto..."
                            className="w-full bg-gray-900 text-white text-xs p-3 rounded-xl border border-gray-700 focus:outline-none focus:border-brand-pink h-20"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setRespondingReviewId(null)}
                              className="px-3 py-1.5 rounded-xl text-xs bg-gray-800 text-gray-300 hover:text-white"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={() => handleSaveResponse(review.id)}
                              className="px-4 py-1.5 rounded-xl text-xs bg-brand-pink text-white font-bold hover:bg-opacity-90"
                            >
                              Guardar Respuesta
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}

                  {filteredReviews.length === 0 && (
                    <div className="text-center py-10 text-gray-400 space-y-2">
                      <MessageSquare className="w-8 h-8 text-gray-600 mx-auto" />
                      <p className="text-xs font-mono">No hay opiniones en esta categoría.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 2: PUBLIC FEED VIEW */}
      {activeTab === 'public_feed' && (
        <div className="bg-brand-slate rounded-3xl p-6 sm:p-8 border border-gray-700/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-heading text-white">Opiniones Públicas Verificadas</h3>
                <VerifiedBadge isVerified={isVerified} docType="INE" userIdCode={userIdCode} size="sm" variant="subtle" />
              </div>
              <p className="text-xs text-gray-400">
                Experiencias compartidas por usuarios y clientes de {providerName}.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('leave_review')}
              className="bg-brand-pink hover:bg-opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
            >
              <UserX className="w-4 h-4" /> Dejar mi Opinión Anónima
            </button>
          </div>

          <div className="space-y-4">
            {publicReviews.map(review => (
              <div
                key={review.id}
                className="bg-gray-900/80 p-5 rounded-2xl border border-gray-800 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{review.authorName}</span>
                    <span className="bg-gray-800 text-gray-400 text-[10px] px-2 py-0.5 rounded-full border border-gray-700">
                      🔒 Anónimo
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{review.date}</span>
                </div>

                <div className="flex text-amber-400 text-sm">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star}>{star <= review.rating ? '★' : '☆'}</span>
                  ))}
                </div>

                <p className="text-sm text-gray-200 italic">"{review.comment}"</p>

                {review.providerResponse && (
                  <div className="bg-brand-deep-purple/30 p-3 rounded-xl border border-brand-pink/30 text-xs space-y-1 mt-2">
                    <span className="text-brand-pink font-bold">Respuesta del Proveedor:</span>
                    <p className="text-gray-300">{review.providerResponse}</p>
                  </div>
                )}
              </div>
            ))}

            {publicReviews.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p className="text-xs font-mono">Aún no hay opiniones públicas visibles para este perfil.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ANONYMOUS REVIEW SUBMISSION FORM */}
      {activeTab === 'leave_review' && (
        <div className="bg-brand-slate rounded-3xl p-6 sm:p-8 border border-gray-700/80 shadow-2xl space-y-6 max-w-2xl mx-auto">
          <div className="border-b border-gray-800 pb-4">
            <h3 className="text-2xl font-heading text-white flex items-center gap-2">
              <UserX className="w-6 h-6 text-brand-pink" />
              Dejar Opinión Totalmente Anónima
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              Tu identidad no será expuesta ni compartida con el proveedor. Tus opiniones ayudan a construir una comunidad segura y de calidad.
            </p>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            
            {/* Main Rating Stars */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                Calificación General
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setNewRating(star)}
                    className={`text-3xl transition-transform hover:scale-125 ${
                      star <= newRating ? 'text-amber-400' : 'text-gray-700'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-900/60 p-4 rounded-2xl border border-gray-800">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 block">Puntualidad</label>
                <select
                  value={newPunctuality}
                  onChange={(e) => setNewPunctuality(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white text-xs p-2 rounded-xl border border-gray-700"
                >
                  <option value={5}>5 ★★★★★ Excelente</option>
                  <option value={4}>4 ★★★★☆ Buena</option>
                  <option value={3}>3 ★★★☆☆ Regular</option>
                  <option value={2}>2 ★★☆☆☆ Mala</option>
                  <option value={1}>1 ★☆☆☆☆ Muy Mala</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 block">Veracidad de Fotos</label>
                <select
                  value={newVeracity}
                  onChange={(e) => setNewVeracity(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white text-xs p-2 rounded-xl border border-gray-700"
                >
                  <option value={5}>5 ★★★★★ 100% Real</option>
                  <option value={4}>4 ★★★★☆ Bastante Real</option>
                  <option value={3}>3 ★★★☆☆ Semejante</option>
                  <option value={2}>2 ★★☆☆☆ Diferente</option>
                  <option value={1}>1 ★☆☆☆☆ Engañosa</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 block">Trato & Respeto</label>
                <select
                  value={newTreatment}
                  onChange={(e) => setNewTreatment(Number(e.target.value))}
                  className="w-full bg-gray-800 text-white text-xs p-2 rounded-xl border border-gray-700"
                >
                  <option value={5}>5 ★★★★★ Insuperable</option>
                  <option value={4}>4 ★★★★☆ Respetuoso</option>
                  <option value={3}>3 ★★★☆☆ Aceptable</option>
                  <option value={2}>2 ★★☆☆☆ Distante</option>
                  <option value={1}>1 ★☆☆☆☆ Irrespetuoso</option>
                </select>
              </div>
            </div>

            {/* Comment Text Area */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                Comentario / Experiencia
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                placeholder="Escribe detalles respetuosos sobre la atención, higiene o amabilidad..."
                className="w-full bg-gray-900 text-white text-xs p-4 rounded-2xl border border-gray-800 focus:outline-none focus:border-brand-pink"
              />
            </div>

            {/* Anonymous Toggle */}
            <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <strong className="text-xs text-white block font-bold">Publicar como Anónimo</strong>
                <span className="text-[10px] text-gray-400">Oculta completamente tu nombre e imagen de perfil.</span>
              </div>

              <button
                type="button"
                onClick={() => setIsAnonymousSubmit(!isAnonymousSubmit)}
                className={`w-12 h-6 rounded-full p-1 transition-colors shrink-0 ${isAnonymousSubmit ? 'bg-brand-pink' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnonymousSubmit ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Privacy note */}
            <div className="text-[11px] text-gray-400 bg-black/40 p-3 rounded-xl border border-gray-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Las valoraciones de 3 estrellas o menos se clasifican como retroalimentación privada para el proveedor y <strong className="text-white">no serán públicas a menos que el proveedor decida mostrarlas</strong>.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3.5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Enviando opinión anónima...' : 'Publicar Valoración Anónima'}
            </button>

          </form>
        </div>
      )}

    </div>
  );
};

export default AnonymousReviewManager;
