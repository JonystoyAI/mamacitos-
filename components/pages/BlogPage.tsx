import React, { useState, useMemo } from 'react';
import { BlogArticle, BlogCategory, Page } from '../../types';
import { BLOG_CATEGORIES, getStoredArticles, isArticleLiked, toggleArticleLike } from '../blog/blogStore';
import ArticleComposerModal from '../blog/ArticleComposerModal';
import ArticleDetailModal from '../blog/ArticleDetailModal';
import { 
  Sparkles, 
  Search, 
  Clock, 
  Heart, 
  Eye, 
  PenTool, 
  Lock, 
  Flame, 
  TrendingUp, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Share2
} from 'lucide-react';
import VerifiedBadge from '../common/VerifiedBadge';

interface BlogPageProps {
  onNavigate?: (page: Page) => void;
  onViewProfile?: (profileId: number | string) => void;
  isUserPremium?: boolean;
}

const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  onViewProfile,
  isUserPremium = true // Default mock as paid user for full functionality
}) => {
  const [articles, setArticles] = useState<BlogArticle[]>(() => getStoredArticles());
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      if (selectedCategory !== 'all' && art.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(q);
        const matchesSummary = art.summary.toLowerCase().includes(q);
        const matchesAuthor = art.authorName.toLowerCase().includes(q);
        const matchesTags = art.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesAuthor && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [articles, selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return articles.find(a => a.isFeatured) || articles[0];
  }, [articles]);

  const handleOpenComposer = () => {
    if (isUserPremium) {
      setIsComposerOpen(true);
    } else {
      setShowPremiumPrompt(true);
    }
  };

  const handleArticlePublished = (newArticle: BlogArticle) => {
    setArticles(prev => [newArticle, ...prev]);
    setSelectedArticle(newArticle);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 pb-20">
      
      {/* Blog Top Hero Bar */}
      <div className="border-b border-neutral-800 bg-neutral-950/80 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                Editorial Oficial
              </span>
              <span className="text-xs text-neutral-500 font-mono">INSIGHTS & CREATORS</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-1">
              Blog Mamacitos
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenComposer}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/10 transition-transform active:scale-95"
            >
              <PenTool className="w-4 h-4 text-neutral-950" />
              <span>Escribir Artículo (Blogger VIP)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        
        {/* Category Navigation Pills (Inspired by Pornhub Insights & OnlyFans Blog) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-rose-500" />
              <span>Categorías & Secciones Temáticas</span>
            </h2>
            <span className="text-xs text-neutral-500">Inspirado en tendencias de datos e industria</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {BLOG_CATEGORIES.map(cat => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap border transition-all ${
                    active
                      ? 'bg-neutral-800 border-amber-400 text-amber-300 font-bold shadow-sm'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                  title={cat.description}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Hero Article Banner */}
        {featuredArticle && selectedCategory === 'all' && !searchQuery && (
          <div 
            onClick={() => setSelectedArticle(featuredArticle)}
            className="group cursor-pointer relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 shadow-xl"
          >
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[420px] overflow-hidden">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-black"></div>
              <span className="absolute top-4 left-4 bg-amber-400 text-neutral-950 font-extrabold text-[10px] uppercase px-3 py-1 rounded-md shadow-md tracking-wider flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> ARTÍCULO DESTACADO
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                    {featuredArticle.categoryLabel}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400 flex items-center gap-1 text-[11px]">
                    <Clock className="w-3 h-3" /> {featuredArticle.readTimeMinutes} min de lectura
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-light">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredArticle.authorAvatar}
                    alt={featuredArticle.authorName}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-700"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white">{featuredArticle.authorName}</h5>
                    <p className="text-[10px] text-neutral-500">{featuredArticle.publishedAt}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Leer completo</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Search & Article Count Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-900">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar guías, insights, autores o etiquetas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-700"
            />
          </div>

          <div className="text-xs text-neutral-400 w-full sm:w-auto text-right">
            Mostrando <strong className="text-white">{filteredArticles.length}</strong> artículos en esta sección
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-md"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-neutral-950">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-700/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {article.categoryLabel}
                    </span>
                    <span className="absolute bottom-2.5 right-3 text-[10px] text-neutral-300 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-neutral-400" /> {article.readTimeMinutes} min
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                      <span>{article.publishedAt}</span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-neutral-400 text-xs line-clamp-3 leading-relaxed font-light">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={article.authorAvatar}
                        alt={article.authorName}
                        className="w-6 h-6 rounded-full object-cover border border-neutral-700"
                      />
                      <span className="text-xs text-neutral-300 font-medium truncate max-w-[120px]">
                        {article.authorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-neutral-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500/80" /> {article.likesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-neutral-500" /> {article.viewsCount}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
            <h4 className="text-base font-bold text-white">No se encontraron artículos</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Prueba con otro término de búsqueda o selecciona otra categoría tematica.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs font-semibold text-amber-400 hover:underline pt-2 inline-block"
            >
              Ver todos los artículos
            </button>
          </div>
        )}

      </div>

      {/* Article Detail Reading Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onViewAuthorProfile={(authorId) => {
          setSelectedArticle(null);
          if (onViewProfile) {
            onViewProfile(authorId);
          }
        }}
      />

      {/* Article Composer Modal for Paid Users */}
      <ArticleComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onArticlePublished={handleArticlePublished}
      />

      {/* Premium Prompt Modal if user is not premium */}
      {showPremiumPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-neutral-900 border border-amber-500/50 rounded-2xl p-6 max-w-md w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Función Exclusiva de Redactores VIP</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Cualquier usuario o prestador con membresía de pago activa puede activar la función de Blogger desde su perfil para publicar artículos en el Blog oficial de Mamacitos y promocionar su contenido.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => setShowPremiumPrompt(false)}
                className="px-4 py-2 text-xs text-neutral-400 bg-neutral-800 rounded-lg hover:text-white"
              >
                Cerrar
              </button>
              {onNavigate && (
                <button
                  onClick={() => {
                    setShowPremiumPrompt(false);
                    onNavigate('premium');
                  }}
                  className="px-5 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow"
                >
                  Ver Planes Premium VIP
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BlogPage;
