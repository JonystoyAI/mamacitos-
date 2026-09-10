import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { TrendingUp, Users, Eye, Sparkles, Calendar, ArrowUpRight, ShieldCheck, Filter, QrCode, Share2, Compass } from 'lucide-react';

interface EngagementAnalyticsChartProps {
  userName?: string;
  userIdCode?: string;
}

// Generate 30 days mock data for engagement trends
const generate30DayData = () => {
  const data = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayStr = `${d.getDate()}/${d.getMonth() + 1}`;

    // Base cyclical traffic (higher on weekends)
    const isWeekend = d.getDay() === 0 || d.getDay() === 5 || d.getDay() === 6;
    const baseViews = isWeekend ? 65 + Math.floor(Math.random() * 35) : 30 + Math.floor(Math.random() * 25);
    const uniqueVisitors = Math.floor(baseViews * (0.65 + Math.random() * 0.2));
    const qrScans = Math.floor(baseViews * 0.15 + Math.random() * 5);
    const directContacts = Math.floor(baseViews * 0.12 + Math.random() * 4);

    data.push({
      date: dayStr,
      fullDate: d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }),
      views: baseViews,
      uniqueVisitors,
      qrScans,
      directContacts,
    });
  }
  return data;
};

const TRAFFIC_SOURCE_DATA = [
  { name: 'Enlace Directo / Landing', value: 45, color: '#F82ED7' },
  { name: 'Explorar Mamacitos', value: 28, color: '#B5FF00' },
  { name: 'Código QR Personal', value: 17, color: '#00F0FF' },
  { name: 'Redes / Telegram', value: 10, color: '#A855F7' },
];

export const EngagementAnalyticsChart: React.FC<EngagementAnalyticsChartProps> = ({
  userName = 'Valentina',
  userIdCode = 'MMC-9821',
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [activeMetric, setActiveMetric] = useState<'all' | 'views' | 'unique' | 'contacts'>('all');

  const fullData = useMemo(() => generate30DayData(), []);

  // Filter data according to selected time range
  const chartData = useMemo(() => {
    if (timeRange === '7d') return fullData.slice(-7);
    if (timeRange === '90d') {
      // Simulate 90d by scaling data slightly
      return fullData.map((item) => ({
        ...item,
        views: Math.round(item.views * 1.1),
        uniqueVisitors: Math.round(item.uniqueVisitors * 1.1),
      }));
    }
    return fullData;
  }, [fullData, timeRange]);

  // Total summary calculations
  const totalViews = useMemo(() => chartData.reduce((acc, curr) => acc + curr.views, 0), [chartData]);
  const totalUniques = useMemo(() => chartData.reduce((acc, curr) => acc + curr.uniqueVisitors, 0), [chartData]);
  const totalQRScans = useMemo(() => chartData.reduce((acc, curr) => acc + curr.qrScans, 0), [chartData]);
  const totalContacts = useMemo(() => chartData.reduce((acc, curr) => acc + curr.directContacts, 0), [chartData]);

  // Custom styled Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-950/95 border border-brand-pink/60 p-3.5 rounded-2xl shadow-2xl backdrop-blur-md text-xs space-y-2">
          <div className="font-bold text-white border-b border-gray-800 pb-1 flex items-center justify-between gap-3">
            <span>📅 {payload[0]?.payload?.fullDate || label}</span>
            <span className="text-[10px] text-brand-lime font-mono">30D TREND</span>
          </div>

          <div className="space-y-1 font-mono">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-1.5 text-gray-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-extrabold text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER WITH METRIC SUMMARY CARDS */}
      <div className="bg-gradient-to-br from-gray-950 via-brand-purple-dark to-gray-950 p-6 sm:p-8 rounded-3xl border border-brand-pink/40 shadow-2xl space-y-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-brand-pink text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow">
                <TrendingUp className="w-3.5 h-3.5" /> RECHARTS VISUALIZER
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Datos Verificados
              </span>
            </div>
            <h2 className="text-2xl font-heading text-white">
              Análisis de Audiencia & Tendencias de Interacción
            </h2>
            <p className="text-xs text-brand-purple-light mt-0.5">
              Visualización interactiva de visualizaciones de perfil, escaneos QR y contactos directos para {userName} ({userIdCode}).
            </p>
          </div>

          {/* Time Filter Tabs */}
          <div className="flex items-center bg-gray-900 p-1.5 rounded-2xl border border-gray-800 shrink-0">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeRange === '7d' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              7 Días
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeRange === '30d' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              30 Días
            </button>
            <button
              onClick={() => setTimeRange('90d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeRange === '90d' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              90 Días
            </button>
          </div>
        </div>

        {/* 4 SUMMARY STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-gray-900/90 p-4 rounded-2xl border border-gray-800 space-y-1 hover:border-brand-pink/60 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-xs">
              <span className="font-bold flex items-center gap-1"><Eye className="w-3.5 h-3.5 text-brand-pink" /> Vistas Totales</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center">+18.4% <ArrowUpRight className="w-3 h-3" /></span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading text-white">{totalViews.toLocaleString()}</div>
            <p className="text-[10px] text-gray-400">Visualizaciones en {timeRange}</p>
          </div>

          <div className="bg-gray-900/90 p-4 rounded-2xl border border-gray-800 space-y-1 hover:border-brand-lime/60 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-xs">
              <span className="font-bold flex items-center gap-1"><Users className="w-3.5 h-3.5 text-brand-lime" /> Visitantes Únicos</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center">+12.1% <ArrowUpRight className="w-3 h-3" /></span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading text-white">{totalUniques.toLocaleString()}</div>
            <p className="text-[10px] text-gray-400">Usuarios únicos distintos</p>
          </div>

          <div className="bg-gray-900/90 p-4 rounded-2xl border border-gray-800 space-y-1 hover:border-cyan-400/60 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-xs">
              <span className="font-bold flex items-center gap-1"><QrCode className="w-3.5 h-3.5 text-cyan-400" /> Escaneos QR</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center">+24.0% <ArrowUpRight className="w-3 h-3" /></span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading text-white">{totalQRScans.toLocaleString()}</div>
            <p className="text-[10px] text-gray-400">Desde tarjetas y enlaces en persona</p>
          </div>

          <div className="bg-gray-900/90 p-4 rounded-2xl border border-gray-800 space-y-1 hover:border-purple-400/60 transition-all">
            <div className="flex items-center justify-between text-gray-400 text-xs">
              <span className="font-bold flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-purple-400" /> Clics a Contacto</span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center">+8.5% <ArrowUpRight className="w-3 h-3" /></span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading text-white">{totalContacts.toLocaleString()}</div>
            <p className="text-[10px] text-gray-400">Conversión a Chat / Mensaje Directo</p>
          </div>

        </div>

        {/* MAIN RECHARTS AREA CHART */}
        <div className="bg-gray-950/80 p-5 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-pink" />
                Tendencia Diario de Vistas de Perfil ({timeRange})
              </h3>
              <p className="text-[11px] text-gray-400">
                Gráfico interactivo de curva de actividad y pases de interacción
              </p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-300">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-brand-pink rounded-full"></span> Vistas</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-brand-lime rounded-full"></span> Visitantes Únicos</span>
            </div>
          </div>

          {/* Recharts AreaChart Container */}
          <div className="w-full h-72 sm:h-80 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F82ED7" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F82ED7" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorUniques" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B5FF00" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#B5FF00" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#2D204A" />
                <XAxis dataKey="date" stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                <YAxis stroke="#9CA3AF" tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Vistas Totales"
                  stroke="#F82ED7"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorViews)"
                />
                <Area
                  type="monotone"
                  dataKey="uniqueVisitors"
                  name="Visitantes Únicos"
                  stroke="#B5FF00"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUniques)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SECONDARY BAR CHART: SOURCE BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          <div className="bg-gray-950/80 p-5 rounded-2xl border border-gray-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-400" /> Origen de las Visitas (%)
            </h4>
            
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TRAFFIC_SOURCE_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D204A" />
                  <XAxis type="number" stroke="#9CA3AF" tick={{ fontSize: 10 }} unit="%" />
                  <YAxis type="category" dataKey="name" stroke="#9CA3AF" tick={{ fontSize: 9 }} width={110} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Porcentaje" radius={[0, 8, 8, 0]}>
                    {TRAFFIC_SOURCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* INSIGHTS & SUMMARY PANEL */}
          <div className="bg-gray-950/80 p-5 rounded-2xl border border-gray-800 flex flex-col justify-between space-y-3">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-lime" />
                Diagnóstico de Engagement (IA Mamacitos)
              </h4>
              
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2 bg-gray-900 p-2.5 rounded-xl border border-gray-800">
                  <span className="text-brand-pink font-bold shrink-0">📈</span>
                  <span><strong>Pico de Tráfico:</strong> Tus mejores días de conversión son los viernes y sábados entre 22:00 y 02:00 hs.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-900 p-2.5 rounded-xl border border-gray-800">
                  <span className="text-brand-lime font-bold shrink-0">📱</span>
                  <span><strong>Impacto QR:</strong> Los escaneos desde tu Código QR en persona generan un <strong>35% más de clics a contacto</strong> que las visitas orgánicas.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-gray-800 text-[10px] text-gray-400 font-mono flex justify-between items-center">
              <span>Actualizado en tiempo real</span>
              <span className="text-brand-pink">Mamacitos Analytics v2.5</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default EngagementAnalyticsChart;
