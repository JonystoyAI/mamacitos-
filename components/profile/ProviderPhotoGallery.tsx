import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface GalleryImage {
  id: string | number;
  url: string;
  title?: string;
  category?: string;
}

interface ProviderPhotoGalleryProps {
  images: GalleryImage[];
  headingColorClass?: string;
}

export const ProviderPhotoGallery: React.FC<ProviderPhotoGalleryProps> = ({ images, headingColorClass = 'text-white' }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImageIndex !== null) {
        closeLightbox();
      }
      if (e.key === 'ArrowLeft' && selectedImageIndex !== null) {
        goToPrev();
      }
      if (e.key === 'ArrowRight' && selectedImageIndex !== null) {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, images.length]);

  // Extract unique categories
  const categories = ['Todos', ...Array.from(new Set(images.map(img => img.category).filter(Boolean) as string[]))];

  const filteredImages = activeCategory === 'Todos' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    // Find the original index of the filtered image
    const originalIndex = images.findIndex(img => img.id === filteredImages[index].id);
    setSelectedImageIndex(originalIndex);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1);
    }
  };

  const goToNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`text-3xl font-heading ${headingColorClass}`}>Galería de Servicios</h2>
      </div>

      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[11px] rounded-full font-bold transition-all shadow-sm ${
                activeCategory === cat 
                  ? 'bg-brand-pink text-white shadow-brand-pink/30 shadow-md scale-105 border border-brand-pink' 
                  : 'bg-black/40 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {filteredImages.map((img, index) => (
          <div 
            key={img.id} 
            className="group relative rounded-xl overflow-hidden aspect-square cursor-pointer bg-gray-900 border border-gray-700/50 hover:border-brand-pink transition-all shadow-md"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={img.url} 
              alt={img.title || `Gallery image ${index + 1}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
               {img.title && <h4 className="text-white font-bold text-sm truncate">{img.title}</h4>}
               {img.category && <span className="text-brand-pink text-[10px] uppercase font-bold tracking-wider">{img.category}</span>}
               <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                 <Maximize2 className="w-3.5 h-3.5" />
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gray-900/50 hover:bg-brand-pink text-white p-2.5 rounded-full backdrop-blur-md transition-colors z-[110]"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            title="Cerrar (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          <button 
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-brand-pink text-white p-3 sm:p-4 rounded-full backdrop-blur-md transition-colors z-[110]"
            onClick={goToPrev}
            title="Anterior (Flecha Izquierda)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full max-h-[85vh] px-14 sm:px-24 flex flex-col items-center justify-center h-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[selectedImageIndex].url} 
              alt={images[selectedImageIndex].title || 'Expanded image'} 
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl select-none"
            />
            
            {(images[selectedImageIndex].title || images[selectedImageIndex].category) && (
              <div className="absolute bottom-6 sm:-bottom-12 left-0 right-0 p-4 text-center z-[110]">
                {images[selectedImageIndex].title && (
                  <h3 className="text-xl sm:text-2xl font-heading text-white drop-shadow-md">{images[selectedImageIndex].title}</h3>
                )}
                {images[selectedImageIndex].category && (
                  <span className="inline-block mt-2 bg-brand-pink/20 text-brand-pink border border-brand-pink/50 text-[10px] sm:text-xs uppercase font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {images[selectedImageIndex].category}
                  </span>
                )}
              </div>
            )}
          </div>

          <button 
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-gray-900/50 hover:bg-brand-pink text-white p-3 sm:p-4 rounded-full backdrop-blur-md transition-colors z-[110]"
            onClick={goToNext}
            title="Siguiente (Flecha Derecha)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 font-mono text-xs bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-md z-[110]">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderPhotoGallery;
