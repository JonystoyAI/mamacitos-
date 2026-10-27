import React, { useState } from 'react';
import { BlogArticle } from '../../types';
import { toggleArticleLike, isArticleLiked } from './blogStore';
import { X, Heart, Share2, Clock, Calendar, Check, ArrowLeft } from 'lucide-react';
import VerifiedBadge from '../common/VerifiedBadge';

interface ArticleDetailModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  onViewAuthorProfile?: (authorId: string) => void;
}

const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onViewAuthorProfile
}) => {
  if (!article) return null;

  const [liked, setLiked] = useState<boolean>(isArticleLiked(article.id));
  const [likesCount, setLikesCount] = useState<number>(article.likesCount);
  const [copied, setCopied] = useState<boolean>(false);

  const handleLike = () => {
    const res = toggleArticleLike(article.id);
    setLiked(res.liked);
    setLikesCount(res.count);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl text-neutral-100 my-auto overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 sticky top-0 z-20 backdrop-blur-md">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Blog</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                liked
                  ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                  : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-current text-rose-400' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white transition-colors"
              title="Copiar enlace"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Compartir'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          
          {/* Header Metadata */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-amber-400/10 border border-amber-400/30 text-amber-300 px-2.5 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wider">
                {article.categoryLabel}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                {article.publishedAt}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                {article.readTimeMinutes} min de lectura
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light italic border-l-2 border-amber-400/60 pl-3">
              {article.summary}
            </p>
          </div>

          {/* Author Card */}
          <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={article.authorAvatar}
                alt={article.authorName}
                className="w-12 h-12 rounded-full object-cover border border-neutral-700"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{article.authorName}</h4>
                  {article.isAuthorVerified && (
                    <VerifiedBadge isVerified={true} size="sm" variant="official" />
                  )}
                </div>
                <p className="text-xs text-neutral-400">{article.authorRole || 'Redactor / Creador en Mamacitos'}</p>
              </div>
            </div>

            {onViewAuthorProfile && (
              <button
                onClick={() => onViewAuthorProfile(article.authorId)}
                className="text-xs bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                Ver Perfil ➔
              </button>
            )}
          </div>

          {/* Cover Image */}
          <div className="relative rounded-2xl overflow-hidden border border-neutral-800 max-h-[380px]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Full Text Content */}
          <div className="prose prose-invert max-w-none text-neutral-200 text-sm sm:text-base leading-relaxed space-y-4">
            {article.content.split('\n\n').map((paragraph, idx) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-serif font-bold text-white mt-6 mb-2">
                    {trimmed.replace(/^###\s*/, '')}
                  </h3>
                );
              }
              if (trimmed.startsWith('####')) {
                return (
                  <h4 key={idx} className="text-lg font-serif font-semibold text-amber-300 mt-4 mb-2">
                    {trimmed.replace(/^####\s*/, '')}
                  </h4>
                );
              }
              if (trimmed.startsWith('>')) {
                return (
                  <blockquote key={idx} className="border-l-2 border-rose-500 pl-4 py-2 italic text-neutral-300 bg-neutral-900/40 rounded-r-lg my-4">
                    {trimmed.replace(/^>\s*/, '')}
                  </blockquote>
                );
              }
              return (
                <p key={idx} className="text-neutral-300 leading-relaxed font-light">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-neutral-800">
              <span className="text-xs text-neutral-500 block mb-2 uppercase tracking-wider font-semibold">
                Etiquetas del tema:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map(t => (
                  <span key={t} className="text-xs bg-neutral-900 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded-md">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Community Callout Footer */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-white">¿Eres usuario o creador de pago?</h4>
              <p className="text-xs text-neutral-400">
                Activa la función de Blogger en tu perfil para publicar artículos y expandir tu alcance en Mamacitos.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-colors shrink-0"
            >
              Explorar Más Artículos
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ArticleDetailModal;
