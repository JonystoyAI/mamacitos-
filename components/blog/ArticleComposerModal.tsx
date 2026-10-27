import React, { useState } from 'react';
import { BlogArticle, BlogCategory } from '../../types';
import { BLOG_CATEGORIES, saveNewArticle } from './blogStore';
import { X, Sparkles, Image, Tag, BookOpen, Check, AlertCircle } from 'lucide-react';

interface ArticleComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArticlePublished: (article: BlogArticle) => void;
  currentUser?: {
    id: string;
    name: string;
    avatar: string;
    role?: string;
    isVerified?: boolean;
    isPremium?: boolean;
  };
}

const PRESET_COVERS = [
  { label: 'Editorial Glam', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Moda & Luces', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Producción & Cámara', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Ciberseguridad', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Bienestar & Salud', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' },
];

const ArticleComposerModal: React.FC<ArticleComposerModalProps> = ({
  isOpen,
  onClose,
  onArticlePublished,
  currentUser = {
    id: 'MMC-9821',
    name: 'Valentina Luxe',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    role: 'Creadora VIP & Blogger',
    isVerified: true,
    isPremium: true
  }
}) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<BlogCategory>('creators');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Consejos VIP', 'Comunidad']);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || title.length < 5) {
      setError('Por favor ingresa un título descriptivo (mínimo 5 caracteres).');
      return;
    }

    if (!summary.trim() || summary.length < 15) {
      setError('Por favor redacta un breve resumen introductorio (mínimo 15 caracteres).');
      return;
    }

    if (!content.trim() || content.length < 50) {
      setError('El cuerpo del artículo debe contener al menos 50 caracteres.');
      return;
    }

    setIsSubmitting(true);

    const selectedCatObj = BLOG_CATEGORIES.find(c => c.id === category);
    const categoryLabel = selectedCatObj?.label || 'Comunidad';

    // Estimate read time (avg 200 words per minute)
    const wordCount = (content.split(/\s+/).length || 100);
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 180));

    try {
      const published = saveNewArticle({
        title: title.trim(),
        summary: summary.trim(),
        content: content.trim(),
        category,
        categoryLabel,
        coverImage: coverImage.trim() || PRESET_COVERS[0].url,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        authorRole: currentUser.role || 'Blogger VIP',
        isAuthorVerified: currentUser.isVerified ?? true,
        isAuthorPremium: currentUser.isPremium ?? true,
        readTimeMinutes,
        tags: tags.length > 0 ? tags : ['General']
      });

      onArticlePublished(published);
      onClose();
    } catch (err) {
      setError('Ocurrió un error al guardar el artículo. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl text-neutral-100 my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Escribir en el Blog de Mamacitos</span>
                <span className="text-[10px] bg-amber-400 text-neutral-950 font-extrabold px-2 py-0.5 rounded uppercase">
                  VIP Blogger
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Comparte guías, experiencias o novedades con la comunidad como usuario verificado
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePublish} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {error && (
            <div className="bg-rose-950/50 border border-rose-800/80 text-rose-200 text-xs p-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Author Badge Preview */}
          <div className="bg-neutral-950 border border-neutral-800 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover border border-neutral-700"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white">{currentUser.name}</span>
                  <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded">
                    ID: {currentUser.id}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{currentUser.role || 'Creadora VIP & Blogger'}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md">
              ✓ Cuenta Autorizada
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Título del Artículo *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Cómo armar tu primer set de iluminación para fotos profesionales"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 placeholder-neutral-500 text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Sección / Categoría *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BlogCategory)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
              >
                {BLOG_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                Imagen de Portada (URL)
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick preset covers */}
          <div>
            <span className="text-[11px] text-neutral-400 block mb-1">O selecciona una portada sugerida:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_COVERS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setCoverImage(preset.url)}
                  className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                    coverImage === preset.url
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-semibold'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Resumen Breve (Aparece en la tarjeta del blog) *
            </label>
            <textarea
              rows={2}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Una sinopsis concisa de 2 a 3 líneas que invite a leer el artículo completo..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-neutral-100 text-xs sm:text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Contenido del Artículo *</span>
              <span className="text-[10px] text-neutral-500 font-normal">Soporta párrafos y encabezados</span>
            </label>
            <textarea
              rows={7}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe aquí el contenido completo. Comparte recomendaciones, anécdotas, consejos de producción o reflexiones sobre la comunidad..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-100 text-xs sm:text-sm focus:border-amber-400 focus:outline-none leading-relaxed font-sans"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Etiquetas (Tags)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Escribe una etiqueta y presiona Agregar (ej: Iluminación, Tips, Seguridad)"
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-100 focus:border-amber-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-neutral-950 border border-neutral-800 text-neutral-300 text-[11px] px-2 py-0.5 rounded flex items-center gap-1"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-400 text-neutral-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-colors flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Publicando...' : 'Publicar en el Blog'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ArticleComposerModal;
