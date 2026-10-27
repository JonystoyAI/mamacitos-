import React, { useState } from 'react';
import { BlogArticle } from '../../types';
import { getStoredArticles } from '../blog/blogStore';
import ArticleComposerModal from '../blog/ArticleComposerModal';
import { 
  PenTool, 
  Sparkles, 
  BookOpen, 
  Heart, 
  Eye, 
  Plus, 
  ExternalLink, 
  ShieldCheck 
} from 'lucide-react';

interface BloggerManagerProps {
  isPremium?: boolean;
  userIdCode?: string;
  userName?: string;
  onNavigateToBlog?: () => void;
}

const BloggerManager: React.FC<BloggerManagerProps> = ({
  isPremium = true,
  userIdCode = 'MMC-9821',
  userName = 'Valentina Luxe',
  onNavigateToBlog
}) => {
  const [bloggerEnabled, setBloggerEnabled] = useState<boolean>(true);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    return getStoredArticles().filter(a => a.authorId === userIdCode || a.authorName === userName);
  });

  const handleArticlePublished = (newArticle: BlogArticle) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  const totalLikes = articles.reduce((acc, a) => acc + a.likesCount, 0);
  const totalViews = articles.reduce((acc, a) => acc + a.viewsCount, 0);

  return (
    <div className="space-y-6">
      {/* Feature Activation Banner */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-xl shrink-0">
              <PenTool className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Función de Blogger VIP Mamacitos
                </h3>
                <span className="text-[10px] bg-amber-400 text-neutral-950 font-extrabold px-2 py-0.5 rounded uppercase">
                  Creador Autorizado
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">
                Como usuario o prestador con membresía de pago, puedes publicar artículos, guías y reflexiones en el blog oficial de Mamacitos para posicionar tu marca y atraer a la comunidad.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={bloggerEnabled}
                onChange={(e) => setBloggerEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
            </label>
            <span className="text-xs font-semibold text-neutral-200">
              {bloggerEnabled ? 'Blogger Activo' : 'Inactivo'}
            </span>
          </div>
        </div>
      </div>

      {bloggerEnabled && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400">Artículos Publicados</span>
                <h4 className="text-2xl font-bold text-white mt-1">{articles.length}</h4>
              </div>
              <BookOpen className="w-6 h-6 text-amber-400/80" />
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400">Lecturas Totales</span>
                <h4 className="text-2xl font-bold text-white mt-1">{totalViews}</h4>
              </div>
              <Eye className="w-6 h-6 text-neutral-400" />
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400">Reacciones / Likes</span>
                <h4 className="text-2xl font-bold text-white mt-1">{totalLikes}</h4>
              </div>
              <Heart className="w-6 h-6 text-rose-500/80" />
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="text-sm font-bold text-white">Tus Publicaciones en el Blog</h4>

            <div className="flex items-center gap-2">
              {onNavigateToBlog && (
                <button
                  onClick={onNavigateToBlog}
                  className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Ver Blog Mamacitos</span>
                </button>
              )}

              <button
                onClick={() => setIsComposerOpen(true)}
                className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs py-2 px-4 rounded-lg shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Escribir Nuevo Artículo</span>
              </button>
            </div>
          </div>

          {/* User's Articles List */}
          {articles.length > 0 ? (
            <div className="space-y-3">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-16 h-16 rounded-lg object-cover border border-neutral-800 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-neutral-800 text-amber-300 font-semibold px-2 py-0.5 rounded">
                          {art.categoryLabel}
                        </span>
                        <span className="text-[10px] text-neutral-500">{art.publishedAt}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mt-1 leading-snug">{art.title}</h5>
                      <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">{art.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 self-end sm:self-center">
                    <div className="text-right text-xs text-neutral-400">
                      <span className="flex items-center gap-1 justify-end">
                        <Heart className="w-3 h-3 text-rose-500" /> {art.likesCount}
                      </span>
                      <span className="flex items-center gap-1 justify-end text-[11px] text-neutral-500">
                        <Eye className="w-3 h-3" /> {art.viewsCount} lecturas
                      </span>
                    </div>

                    <span className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-md font-medium">
                      Publicado
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900/40 border border-dashed border-neutral-800 rounded-2xl p-8 text-center space-y-3">
              <PenTool className="w-8 h-8 text-neutral-600 mx-auto" />
              <h5 className="text-sm font-bold text-white">Aún no has publicado ningún artículo</h5>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Escribe tu primera guía, consejos para la comunidad o comparte tu historia para aparecer en la portada del Blog Oficial de Mamacitos.
              </p>
              <button
                onClick={() => setIsComposerOpen(true)}
                className="inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs py-2 px-4 rounded-lg shadow transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Redactar Mi Primer Artículo</span>
              </button>
            </div>
          )}

          {/* Tips Section */}
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-400 space-y-2">
            <h5 className="font-bold text-neutral-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Pautas editoriales para publicaciones seguras:
            </h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-400 text-[11px]">
              <li>No compartas direcciones privadas ni números bancarios en el texto público.</li>
              <li>Tus artículos enlazan automáticamente a tu perfil de Mamacitos para canalizar a los usuarios interesados.</li>
              <li>Los artículos con fotos de portada nítidas y formato estructurado reciben 3 veces más interacción.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Article Composer Modal */}
      <ArticleComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onArticlePublished={handleArticlePublished}
        currentUser={{
          id: userIdCode,
          name: userName,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          role: 'Creadora VIP & Blogger',
          isVerified: true,
          isPremium: isPremium
        }}
      />
    </div>
  );
};

export default BloggerManager;
