import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  Eye,
  Unlock,
  TrendingUp,
  DollarSign,
  Wallet,
  ArrowUpRight,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface ContentMetric {
  id: string;
  title: string;
  price: number;
  views: number;
  unlocks: number;
  conversionRate: number; // percentage
  grossEarnings: number;
  pendingEarnings: number;
  clearedEarnings: number;
  status: 'active' | 'archived';
  createdAt: string;
}

const MOCK_CONTENT_METRICS: ContentMetric[] = [
  {
    id: 'cnt-101',
    title: 'Set Exclusivo Lencería & Sesión Privada CDMX',
    price: 350,
    views: 1240,
    unlocks: 112,
    conversionRate: 9.03,
    grossEarnings: 39200,
    pendingEarnings: 4200,
    clearedEarnings: 35000,
    status: 'active',
    createdAt: '2026-09-02'
  },
  {
    id: 'cnt-102',
    title: 'Masterclass de Estilo, Modelaje & Contenido Sensual',
    price: 600,
    views: 890,
    unlocks: 54,
    conversionRate: 6.06,
    grossEarnings: 32400,
    pendingEarnings: 3600,
    clearedEarnings: 28800,
    status: 'active',
    createdAt: '2026-09-04'
  },
  {
    id: 'cnt-103',
    title: 'Pack Detrás de Cámaras Backstage Show',
    price: 250,
    views: 620,
    unlocks: 48,
    conversionRate: 7.74,
    grossEarnings: 12000,
    pendingEarnings: 1500,
    clearedEarnings: 10500,
    status: 'active',
    createdAt: '2026-09-06'
  }
];

const DAILY_TREND_DATA = [
  { date: '03 Sep', views: 210, unlocks: 16, earnings: 5200 },
  { date: '04 Sep', views: 340, unlocks: 28, earnings: 9400 },
  { date: '05 Sep', views: 420, unlocks: 35, earnings: 11800 },
  { date: '06 Sep', views: 380, unlocks: 31, earnings: 9900 },
  { date: '07 Sep', views: 510, unlocks: 44, earnings: 14200 },
  { date: '08 Sep', views: 490, unlocks: 39, earnings: 12600 },
  { date: '09 Sep', views: 600, unlocks: 51, earnings: 16500 },
];

const CreatorMetricsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('7d');
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('9300');
  const [payoutMethod, setPayoutMethod] = useState<'clabe' | 'id_boveda'>('id_boveda');
  const [clabeInput, setClabeInput] = useState('');
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Calculated Aggregate Totals
  const totalViews = MOCK_CONTENT_METRICS.reduce((acc, curr) => acc + curr.views, 0);
  const totalUnlocks = MOCK_CONTENT_METRICS.reduce((acc, curr) => acc + curr.unlocks, 0);
  const avgConversionRate = (totalUnlocks / totalViews) * 100;
  const totalPendingEarnings = MOCK_CONTENT_METRICS.reduce((acc, curr) => acc + curr.pendingEarnings, 0);
  const totalClearedEarnings = MOCK_CONTENT_METRICS.reduce((acc, curr) => acc + curr.clearedEarnings, 0);

  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setShowPayoutModal(false);
      alert('¡Solicitud de Retiro Discreto Enviada! Tu pago se transferirá en menos de 2 horas.');
    }, 1500);
  };

  return (
    <div className="bg-brand-slate rounded-3xl p-6 sm:p-8 border border-brand-lime/30 shadow-2xl space-y-8">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-700/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-brand-lime text-brand-purple-dark text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
              MAMACITOS CREATOR ANALYTICS
            </span>
            <span className="bg-brand-pink text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Panel de Control de Creadora
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading text-white mt-2">
            Métricas de Desbloqueos & Bóveda de Pagos
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Supervisa el rendimiento de tu contenido, tasa de conversión y retira tus ganancias de forma 100% discreta.
          </p>
        </div>

        {/* Time Filter & Action */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-700 text-xs">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                timeRange === '7d' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              7 Días
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                timeRange === '30d' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              30 Días
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                timeRange === 'all' ? 'bg-brand-pink text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Histórico
            </button>
          </div>

          <button
            onClick={() => setShowPayoutModal(true)}
            className="bg-brand-lime hover:bg-opacity-90 text-brand-purple-dark font-extrabold text-xs py-3 px-5 rounded-xl transition-all shadow-lg shadow-brand-lime/20 flex items-center gap-1.5"
          >
            <Wallet className="w-4 h-4" />
            Retirar Saldo (${totalPendingEarnings.toLocaleString()} MXN)
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Vistas Totales */}
        <div className="bg-gray-900/80 p-5 rounded-2xl border border-gray-800 space-y-2 hover:border-brand-pink/40 transition-all shadow-xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Vistas Totales</span>
            <div className="p-2 bg-brand-pink/20 text-brand-pink rounded-xl">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading text-white">{totalViews.toLocaleString()}</span>
            <span className="text-xs text-green-400 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <p className="text-[11px] text-gray-400">Visualizaciones en tus publicaciones censuradas.</p>
        </div>

        {/* Card 2: Desbloqueos de Contenido */}
        <div className="bg-gray-900/80 p-5 rounded-2xl border border-gray-800 space-y-2 hover:border-brand-lime/40 transition-all shadow-xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Desbloqueos Exitosos</span>
            <div className="p-2 bg-brand-lime/20 text-brand-lime rounded-xl">
              <Unlock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading text-white">{totalUnlocks}</span>
            <span className="text-xs text-green-400 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +24%
            </span>
          </div>
          <p className="text-[11px] text-gray-400">Ventas directas con liberación de enlace externo.</p>
        </div>

        {/* Card 3: Tasa de Conversión */}
        <div className="bg-gray-900/80 p-5 rounded-2xl border border-gray-800 space-y-2 hover:border-brand-pink/40 transition-all shadow-xl">
          <div className="flex justify-between items-center text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Tasa de Conversión</span>
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading text-brand-pink">{avgConversionRate.toFixed(1)}%</span>
            <span className="bg-green-950 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/30">
              Excelente
            </span>
          </div>
          <p className="text-[11px] text-gray-400">Porcentaje de visitantes que pagan por tu set.</p>
        </div>

        {/* Card 4: Saldo Pendiente en Bóveda */}
        <div className="bg-gradient-to-br from-gray-900 via-brand-deep-purple/60 to-gray-900 p-5 rounded-2xl border border-brand-lime/50 space-y-2 shadow-xl">
          <div className="flex justify-between items-center text-gray-300">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-lime">Saldo Pendiente Bóveda</span>
            <div className="p-2 bg-brand-lime/20 text-brand-lime rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading text-white">${totalPendingEarnings.toLocaleString()} MXN</span>
          </div>
          <p className="text-[11px] text-gray-300">Listo para dispersión inmediata por ID o CLABE.</p>
        </div>

      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Trend Area Chart (Views vs Unlocks) */}
        <div className="lg:col-span-2 bg-gray-900/60 p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-heading text-white">Tendencia de Vistas vs. Desbloqueos</h3>
              <p className="text-xs text-gray-400">Comportamiento diario de la audiencia en tus publicaciones.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <span className="flex items-center gap-1.5 text-brand-pink">
                <span className="w-3 h-3 rounded-full bg-brand-pink inline-block"></span> Vistas
              </span>
              <span className="flex items-center gap-1.5 text-brand-lime">
                <span className="w-3 h-3 rounded-full bg-brand-lime inline-block"></span> Desbloqueos
              </span>
            </div>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff007a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ff007a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnlocks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ccff00" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ccff00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3d" />
                <XAxis dataKey="date" stroke="#8892b0" fontSize={11} tickLine={false} />
                <YAxis stroke="#8892b0" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#131722', borderColor: '#333b52', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="views" name="Vistas" stroke="#ff007a" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="unlocks" name="Desbloqueos" stroke="#ccff00" strokeWidth={3} fillOpacity={1} fill="url(#colorUnlocks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown Bar Chart */}
        <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 space-y-4">
          <div>
            <h3 className="text-base font-heading text-white">Ingresos por Publicación</h3>
            <p className="text-xs text-gray-400">Comparativa de ingresos brutos por set.</p>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CONTENT_METRICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2e3d" />
                <XAxis dataKey="id" stroke="#8892b0" fontSize={11} tickLine={false} />
                <YAxis stroke="#8892b0" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#131722', borderColor: '#333b52', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="grossEarnings" name="Ingresos ($ MXN)" fill="#ccff00" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Content Breakdown Table */}
      <div className="bg-gray-900/60 rounded-2xl border border-gray-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-lg font-heading text-white">Desglose Detallado por Contenido</h3>
            <p className="text-xs text-gray-400">Monitorea la conversión y los pagos retenidos en Bóveda para cada publicación.</p>
          </div>

          <div className="bg-brand-deep-purple px-3 py-1.5 rounded-xl border border-brand-purple-light/30 text-xs text-brand-lime font-mono">
            ★ Comisión Mamacitos VIP: 0% (Totalidad para la creadora)
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider font-mono">
                <th className="py-3 px-4">Publicación / Set</th>
                <th className="py-3 px-4">Precio</th>
                <th className="py-3 px-4">Vistas</th>
                <th className="py-3 px-4">Ventas</th>
                <th className="py-3 px-4">Tasa Conversión</th>
                <th className="py-3 px-4">Saldo Pendiente</th>
                <th className="py-3 px-4">Total Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-200">
              {MOCK_CONTENT_METRICS.map((item) => (
                <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-4 px-4">
                    <strong className="text-white block text-sm">{item.title}</strong>
                    <span className="text-[10px] text-gray-500 font-mono">ID: {item.id} • Publicado {item.createdAt}</span>
                  </td>
                  <td className="py-4 px-4 font-bold text-brand-lime">
                    ${item.price} MXN
                  </td>
                  <td className="py-4 px-4 font-mono text-gray-300">
                    {item.views.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-white">
                    {item.unlocks}
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-purple-950/80 text-purple-300 border border-purple-500/40 px-2.5 py-1 rounded-full font-bold font-mono">
                      {item.conversionRate}%
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-brand-lime">
                    ${item.pendingEarnings.toLocaleString()} MXN
                  </td>
                  <td className="py-4 px-4 font-bold text-white">
                    ${item.grossEarnings.toLocaleString()} MXN
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DISCREET PAYOUT MODAL */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-brand-deep-purple border-2 border-brand-lime/60 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative space-y-6">
            
            <button
              onClick={() => setShowPayoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <span className="bg-brand-lime text-brand-purple-dark text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                Dispersión Discreta por Bóveda Mamacitos
              </span>
              <h3 className="text-2xl font-heading text-white">
                Solicitud de Retiro de Ganancias
              </h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto">
                Transfiere tu saldo acumulado directamente a tu cuenta o ID Bóveda sin dejar rastros públicos.
              </p>
            </div>

            <form onSubmit={handleRequestPayout} className="space-y-5">
              
              {/* Saldo Disponible Box */}
              <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-700 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-400 block">Saldo Pendiente Bóveda:</span>
                  <strong className="text-2xl font-heading text-brand-lime">${totalPendingEarnings.toLocaleString()} MXN</strong>
                </div>
                <span className="bg-green-600/20 text-green-400 border border-green-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Protegido
                </span>
              </div>

              {/* Amount to Withdraw */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Monto a Retirar ($ MXN):</label>
                <input
                  type="number"
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  max={totalPendingEarnings}
                  className="w-full bg-gray-900 border border-brand-lime/40 rounded-xl p-3 text-lg font-mono font-bold text-brand-lime focus:outline-none focus:border-brand-lime"
                  required
                />
              </div>

              {/* Method Picker */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">Método de Dispersión Discreta:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayoutMethod('id_boveda')}
                    className={`p-3 rounded-xl text-xs font-bold border-2 text-left transition-all ${
                      payoutMethod === 'id_boveda'
                        ? 'border-brand-lime bg-brand-lime/20 text-brand-lime shadow-lg'
                        : 'border-gray-800 bg-gray-900 text-gray-400'
                    }`}
                  >
                    <strong className="block text-white">ID Bóveda Mamacitos</strong>
                    <span className="text-[10px] opacity-80">Retiro instantáneo por ID Anónimo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayoutMethod('clabe')}
                    className={`p-3 rounded-xl text-xs font-bold border-2 text-left transition-all ${
                      payoutMethod === 'clabe'
                        ? 'border-brand-pink bg-brand-pink/20 text-brand-pink shadow-lg'
                        : 'border-gray-800 bg-gray-900 text-gray-400'
                    }`}
                  >
                    <strong className="block text-white">Transferencia CLABE SPEI</strong>
                    <span className="text-[10px] opacity-80">Concepto privado (Sin mención de app)</span>
                  </button>
                </div>
              </div>

              {payoutMethod === 'clabe' && (
                <div className="animate-fade-in">
                  <label className="block text-xs font-bold text-gray-300 mb-1">CLABE Interbancaria (18 dígitos):</label>
                  <input
                    type="text"
                    maxLength={18}
                    placeholder="012180000000000000"
                    value={clabeInput}
                    onChange={(e) => setClabeInput(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-xs font-mono text-white focus:outline-none focus:border-brand-pink"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={payoutSuccess}
                className="w-full bg-brand-lime hover:bg-opacity-90 text-brand-purple-dark font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all shadow-xl flex items-center justify-center gap-2"
              >
                {payoutSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-brand-purple-dark animate-bounce" />
                    ¡Transferencia en Proceso!
                  </>
                ) : (
                  `Solicitar Retiro Discreto ($${Number(payoutAmount).toLocaleString()} MXN)`
                )}
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default CreatorMetricsDashboard;
