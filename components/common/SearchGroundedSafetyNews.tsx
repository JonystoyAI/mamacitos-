import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, Calendar, ExternalLink, RefreshCw, Sparkles, CheckCircle2, AlertTriangle, MapPin, Globe } from 'lucide-react';

interface GroundingSource {
  title: string;
  url: string;
}

interface SafetyNewsResponse {
  success: boolean;
  text: string;
  searchQueries: string[];
  groundingSources: GroundingSource[];
  timestamp?: string;
  error?: string;
}

const PRESET_QUERIES = [
  {
    id: 'alerts',
    label: '🛡️ Alertas de Seguridad & Operativos',
    query: 'Alertas de seguridad, operativos y noticias recientes para la comunidad trans y LGBT en México',
  },
  {
    id: 'events',
    label: '📍 Eventos & Espacios Seguros',
    query: 'Próximos eventos culturales, marchas y reuniones seguras de la comunidad trans y diversidad en CDMX y México',
  },
  {
    id: 'privacy',
    label: '🔒 Recomendaciones para Prestadoras',
    query: 'Protocolos de seguridad, verificación de identidad y consejos de prevención para trabajo independiente y citas',
  },
  {
    id: 'rights',
    label: '📜 Derechos & Apoyo Jurídico',
    query: 'Leyes recientes, derechos de personas trans y líneas de apoyo de emergencia en México',
  },
];

export const SearchGroundedSafetyNews: React.FC = () => {
  const [activePreset, setActivePreset] = useState<string>('alerts');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SafetyNewsResponse | null>(null);
  const [locationState, setLocationState] = useState<string>('Ciudad de México / México');

  const executeSearch = async (queryToRun: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/safety-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToRun, location: locationState }),
      });
      const result: SafetyNewsResponse = await response.json();
      if (result.success) {
        setData(result);
      } else {
        setData({
          success: false,
          text: result.error || 'No se pudo obtener la información verificada en este momento.',
          searchQueries: [],
          groundingSources: [],
        });
      }
    } catch (err: any) {
      setData({
        success: false,
        text: 'Error de conexión con el servicio de búsqueda de seguridad.',
        searchQueries: [],
        groundingSources: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initial = PRESET_QUERIES.find(p => p.id === activePreset);
    if (initial) {
      executeSearch(initial.query);
    }
  }, []);

  const handlePresetSelect = (preset: typeof PRESET_QUERIES[0]) => {
    setActivePreset(preset.id);
    setCustomQuery('');
    executeSearch(preset.query);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setActivePreset('custom');
    executeSearch(customQuery);
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-brand-purple-dark to-gray-950 rounded-3xl border border-brand-pink/50 p-6 sm:p-8 shadow-2xl text-white space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-brand-pink text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
              <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} /> VERIFICACIÓN CON BÚSQUEDA GOOGLE
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Tiempo Real 2026
            </span>
          </div>
          <h2 className="text-2xl font-heading text-white flex items-center gap-2">
            Noticias de Seguridad & Eventos Locales
          </h2>
          <p className="text-xs text-brand-purple-light mt-1">
            Información en directo verificada con la API de Gemini y Búsqueda de Google para la comunidad de Mamacitos.
          </p>
        </div>

        {/* Location selector */}
        <div className="flex items-center gap-2 bg-gray-900/90 p-2.5 rounded-2xl border border-gray-800 shrink-0">
          <MapPin className="w-4 h-4 text-brand-pink" />
          <select
            value={locationState}
            onChange={(e) => {
              setLocationState(e.target.value);
              const currentP = PRESET_QUERIES.find(p => p.id === activePreset);
              executeSearch(customQuery || (currentP ? currentP.query : PRESET_QUERIES[0].query));
            }}
            className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
          >
            <option value="Ciudad de México" className="bg-gray-900 text-white">Ciudad de México (CDMX)</option>
            <option value="Jalisco / Guadalajara" className="bg-gray-900 text-white">Guadalajara / Jalisco</option>
            <option value="Nuevo León / Monterrey" className="bg-gray-900 text-white">Monterrey / Nuevo León</option>
            <option value="Estado de México" className="bg-gray-900 text-white">Estado de México</option>
            <option value="Quintana Roo / Cancún" className="bg-gray-900 text-white">Cancún / Quintana Roo</option>
            <option value="Puebla" className="bg-gray-900 text-white">Puebla</option>
            <option value="México Nacional" className="bg-gray-900 text-white">Todo México</option>
          </select>
        </div>
      </div>

      {/* QUICK PRESET BUTTONS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PRESET_QUERIES.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handlePresetSelect(preset)}
            className={`p-3 rounded-2xl text-xs font-bold transition-all text-left border flex items-center justify-between ${
              activePreset === preset.id
                ? 'bg-brand-pink text-white border-brand-pink shadow-lg scale-[1.02]'
                : 'bg-brand-slate/60 hover:bg-gray-800 text-gray-300 border-gray-700/80'
            }`}
          >
            <span>{preset.label}</span>
            {activePreset === preset.id && <Sparkles className="w-3.5 h-3.5 text-brand-lime shrink-0" />}
          </button>
        ))}
      </div>

      {/* CUSTOM SEARCH FORM */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Escribe una búsqueda específica (ej: Operativos de tráfico nocturno, alertas de clima, marchas)..."
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            className="w-full bg-gray-900/90 border border-gray-700 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-brand-pink"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !customQuery.trim()}
          className="bg-brand-lime hover:bg-opacity-90 disabled:opacity-50 text-brand-purple-dark font-bold px-5 py-3 rounded-2xl text-xs flex items-center gap-1.5 shadow-md whitespace-nowrap cursor-pointer"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          <span>Buscar con Google</span>
        </button>
      </form>

      {/* SEARCH RESULTS & GROUNDING DETAILS */}
      <div className="bg-gray-900/80 rounded-2xl border border-gray-800 p-5 sm:p-6 space-y-4">
        {loading ? (
          <div className="py-12 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-brand-pink animate-spin mx-auto" />
            <p className="text-xs font-mono text-brand-purple-light">
              Consultando la API de Búsqueda de Google en tiempo real para {locationState}...
            </p>
          </div>
        ) : data ? (
          <div className="space-y-5 animate-fade-in">
            
            {/* Executed Search Queries Badge */}
            {data.searchQueries && data.searchQueries.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-b border-gray-800 pb-3">
                <span className="text-[10px] text-gray-400 font-mono">Búsquedas Ejecutadas:</span>
                {data.searchQueries.map((q, idx) => (
                  <span key={idx} className="bg-gray-800 text-brand-lime text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-gray-700">
                    "{q}"
                  </span>
                ))}
              </div>
            )}

            {/* Generated Summary Text */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
              {data.text}
            </div>

            {/* Verified Sources / Citations list */}
            {data.groundingSources && data.groundingSources.length > 0 && (
              <div className="pt-4 border-t border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-brand-pink" />
                  Fuentes Web Verificadas por Google:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data.groundingSources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-950 hover:bg-gray-800 p-2.5 rounded-xl border border-gray-800 text-[11px] text-brand-purple-light hover:text-white flex items-center justify-between transition-colors group"
                    >
                      <span className="truncate pr-2">{source.title}</span>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-brand-pink shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {data.timestamp && (
              <div className="text-[10px] text-gray-500 font-mono text-right pt-2">
                Última actualización: {new Date(data.timestamp).toLocaleTimeString()} hs
              </div>
            )}

          </div>
        ) : (
          <div className="py-8 text-center text-xs text-gray-400">
            Haz clic en uno de los accesos directos o escribe tu búsqueda para obtener alertas en tiempo real.
          </div>
        )}
      </div>

    </div>
  );
};

export default SearchGroundedSafetyNews;
