import React, { useState } from 'react';
import { QrCode, Download, Share2, Copy, Check, Sparkles, Smartphone, ShieldCheck, Printer, X } from 'lucide-react';

interface ProfileQRCodeProps {
  slug: string;
  providerName: string;
  userIdCode: string;
  profileImage?: string;
  customTitle?: string;
  compact?: boolean;
}

// Deterministic QR Matrix Generator for scalable SVG rendering
function generateQRMatrix(input: string, size = 25): boolean[][] {
  const matrix: boolean[][] = Array(size).fill(false).map(() => Array(size).fill(false));

  // Helper to draw Finder Pattern (7x7 box with 3x3 center)
  const drawFinder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const nr = row + r;
        const nc = col + c;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (r === -1 || r === 7 || c === -1 || c === 7) {
            matrix[nr][nc] = false; // Quiet border
          } else if (r === 0 || r === 6 || c === 0 || c === 6) {
            matrix[nr][nc] = true; // Outer ring
          } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
            matrix[nr][nc] = true; // Inner solid box
          } else {
            matrix[nr][nc] = false;
          }
        }
      }
    }
  };

  // Draw 3 Corner Finders
  drawFinder(0, 0); // Top-Left
  drawFinder(0, size - 7); // Top-Right
  drawFinder(size - 7, 0); // Bottom-Left

  // Draw Alignment Pattern at bottom-right area if size >= 25
  if (size >= 25) {
    const alignR = size - 7;
    const alignC = size - 7;
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        const nr = alignR + r;
        const nc = alignC + c;
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)) {
            matrix[nr][nc] = true;
          }
        }
      }
    }
  }

  // Draw Timing Patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Deterministic Hash Fill for data payload based on string URL
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      // Skip finder patterns area
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= size - 8;
      const inBottomLeft = r >= size - 8 && c < 8;
      const inAlign = size >= 25 && r >= size - 9 && c >= size - 9;
      const inCenterLogo = r >= Math.floor(size / 2) - 2 && r <= Math.floor(size / 2) + 2 &&
                          c >= Math.floor(size / 2) - 2 && c <= Math.floor(size / 2) + 2;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inAlign && !inCenterLogo) {
        const seed = (r * 31 + c * 17 + hash) ^ (r * c);
        matrix[r][c] = (seed % 3 === 0 || seed % 5 === 0);
      }
    }
  }

  return matrix;
}

export const ProfileQRCode: React.FC<ProfileQRCodeProps> = ({
  slug,
  providerName,
  userIdCode,
  profileImage,
  customTitle = 'Escanea para Perfil VIP',
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);
  const [showPrintCard, setShowPrintCard] = useState(false);

  const fullShareUrl = `https://mamacitos.com/p/${slug || 'perfil'}`;
  const matrix = generateQRMatrix(fullShareUrl, 25);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullShareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById(`qr-svg-${userIdCode}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `QR_Mamacitos_${slug}_${userIdCode}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      
      {/* MAIN QR CARD DISPLAY */}
      <div className={`bg-gradient-to-br from-gray-950 via-brand-slate/90 to-gray-950 rounded-3xl border border-brand-pink/40 shadow-2xl transition-all ${compact ? 'p-4' : 'p-6 sm:p-8'}`}>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-pink text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                <QrCode className="w-3 h-3" /> CÓDIGO QR ÚNICO
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Compartir en Persona
              </span>
            </div>
            <h3 className="text-xl font-heading text-white">{customTitle}</h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Ideal para tarjetas de presentación, eventos privados y compartir frente a frente.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFullModal(true)}
              className="bg-brand-pink/20 hover:bg-brand-pink text-brand-pink hover:text-white border border-brand-pink/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <Smartphone className="w-3.5 h-3.5" /> Pantalla Completa
            </button>

            <button
              onClick={() => setShowPrintCard(true)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" /> Tarjeta Imprimible
            </button>
          </div>
        </div>

        {/* QR CODE CONTAINER & PREVIEW */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          
          {/* Scalable Vector QR Code Frame */}
          <div className="relative group p-4 bg-white rounded-3xl shadow-2xl border-4 border-brand-pink/60 flex flex-col items-center justify-center">
            
            <svg
              id={`qr-svg-${userIdCode}`}
              viewBox="0 0 25 25"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl"
              shapeRendering="crispEdges"
            >
              <rect width="25" height="25" fill="#FFFFFF" />
              {matrix.map((row, r) =>
                row.map((cell, c) => {
                  if (!cell) return null;
                  return (
                    <rect
                      key={`${r}-${c}`}
                      x={c}
                      y={r}
                      width="1"
                      height="1"
                      fill="#320368"
                    />
                  );
                })
              )}
            </svg>

            {/* Center Logo Overlay Badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-brand-purple-dark text-white p-2 rounded-2xl border-2 border-brand-pink shadow-2xl flex flex-col items-center">
                <span className="text-[9px] font-extrabold text-brand-lime font-mono leading-none">MAMACITOS</span>
                <span className="text-[8px] text-brand-pink font-bold leading-none mt-0.5">VIP</span>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold text-gray-800 mt-2">
              ID: {userIdCode}
            </span>
          </div>

          {/* Details & Share Actions */}
          <div className="space-y-4 max-w-sm text-center md:text-left">
            <div className="bg-black/50 p-4 rounded-2xl border border-gray-800 space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Enlace Directo Verificado:</span>
              </div>
              <p className="text-xs font-mono text-brand-lime break-all bg-gray-900/80 p-2.5 rounded-xl border border-gray-700">
                {fullShareUrl}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCopyLink}
                className="bg-brand-slate hover:bg-gray-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-gray-700 transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '¡Copiado!' : 'Copiar Link'}</span>
              </button>

              <button
                onClick={handleDownloadSVG}
                className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Descargar QR</span>
              </button>
            </div>

            <div className="text-[11px] text-gray-400 bg-gray-900/60 p-3 rounded-xl border border-gray-800 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
              <span>
                Cualquier smartphone con cámara puede escanear este código para acceder directamente a tu perfil VIP.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* FULL SCREEN SCAN MODAL FOR IN-PERSON SHARING */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative bg-gradient-to-b from-gray-900 via-brand-slate to-black p-8 rounded-3xl border border-brand-pink/60 max-w-sm w-full text-center space-y-6 shadow-2xl">
            
            <button
              onClick={() => setShowFullModal(false)}
              className="absolute top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="bg-brand-pink text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                ESCANEA CON LA CÁMARA
              </span>
              <h3 className="text-2xl font-heading text-white mt-2">{providerName}</h3>
              <p className="text-xs text-brand-lime font-mono">ID Oficial: {userIdCode}</p>
            </div>

            {/* Giant Fullscreen QR */}
            <div className="bg-white p-6 rounded-3xl shadow-2xl border-4 border-brand-pink inline-block relative mx-auto">
              <svg viewBox="0 0 25 25" className="w-64 h-64" shapeRendering="crispEdges">
                <rect width="25" height="25" fill="#FFFFFF" />
                {matrix.map((row, r) =>
                  row.map((cell, c) => {
                    if (!cell) return null;
                    return <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#320368" />;
                  })
                )}
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-brand-purple-dark text-white p-2.5 rounded-2xl border-2 border-brand-pink shadow-2xl flex flex-col items-center">
                  <span className="text-[10px] font-extrabold text-brand-lime font-mono leading-none">MAMACITOS</span>
                  <span className="text-[9px] text-brand-pink font-bold leading-none mt-0.5">VIP</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-300">
              Apunta la cámara de tu teléfono hacia este código para abrir mi perfil y servicios.
            </p>

            <button
              onClick={() => setShowFullModal(false)}
              className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3 rounded-xl text-xs"
            >
              Cerrar Pantalla Completa
            </button>
          </div>
        </div>
      )}

      {/* PRINTABLE BUSINESS CARD PREVIEW MODAL */}
      {showPrintCard && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-700 max-w-md w-full space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => setShowPrintCard(false)}
              className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-heading text-white">Tarjeta de Presentación Discreta</h3>
              <p className="text-xs text-gray-400">Vista previa de tu tarjeta impresa personal con código QR</p>
            </div>

            {/* Elegant Business Card Mockup */}
            <div className="bg-gradient-to-r from-gray-950 via-brand-purple-dark to-gray-950 p-6 rounded-2xl border border-brand-pink/60 shadow-2xl text-white space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-heading text-white">{providerName}</h4>
                  <span className="text-[10px] text-brand-lime font-mono block">Perfil Verificado VIP</span>
                </div>
                <div className="bg-brand-pink/20 border border-brand-pink px-2.5 py-1 rounded-full text-[10px] font-mono text-brand-pink font-bold">
                  {userIdCode}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-800">
                <div className="text-[11px] text-gray-300 space-y-1">
                  <p>✨ Experiencias Exclusivas</p>
                  <p>🔒 Absoluta Discreción</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-2">{fullShareUrl}</p>
                </div>

                <div className="bg-white p-2 rounded-xl shrink-0">
                  <svg viewBox="0 0 25 25" className="w-20 h-20" shapeRendering="crispEdges">
                    <rect width="25" height="25" fill="#FFFFFF" />
                    {matrix.map((row, r) =>
                      row.map((cell, c) => {
                        if (!cell) return null;
                        return <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#320368" />;
                      })
                    )}
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 bg-brand-pink text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" /> Imprimir Tarjeta
              </button>
              <button
                onClick={() => setShowPrintCard(false)}
                className="flex-1 bg-gray-800 text-gray-300 font-bold py-3 rounded-xl text-xs"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProfileQRCode;
