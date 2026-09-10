import React, { useState } from 'react';
import { DiscreetTransaction } from '../../types';

const INITIAL_TRANSACTIONS: DiscreetTransaction[] = [
  {
    id: 'TX-8839201',
    buyerUserId: 'MMC-USER-9182',
    sellerUserId: 'MMC-CREATOR-4012',
    sellerName: 'Valeria Trans VIP',
    itemTitle: 'Servicio / Contenido Exclusivo',
    amount: 1000,
    commissionRate: 0.12, // 12%
    commissionAmount: 120,
    netPayout: 880,
    status: 'COMPLETED',
    timestamp: '2026-09-09 18:32'
  },
  {
    id: 'TX-8839202',
    buyerUserId: 'MMC-USER-3301',
    sellerUserId: 'MMC-CREATOR-1088',
    sellerName: 'Luna Exclusive',
    itemTitle: 'Reserva de Cita Discreta',
    amount: 2500,
    commissionRate: 0.12,
    commissionAmount: 300,
    netPayout: 2200,
    status: 'COMPLETED',
    timestamp: '2026-09-09 19:15'
  }
];

const DiscreetPaymentsPage: React.FC = () => {
  const [saleAmount, setSaleAmount] = useState<number>(1500);
  const [commissionRate, setCommissionRate] = useState<number>(12); // 12%
  const [simTransactions, setSimTransactions] = useState<DiscreetTransaction[]>(INITIAL_TRANSACTIONS);
  const [testBuyerId, setTestBuyerId] = useState<string>('MMC-USER-7731');
  const [testSellerId, setTestSellerId] = useState<string>('MMC-CREATOR-4012');
  const [simulating, setSimulating] = useState<boolean>(false);

  // Computed financial figures
  const commissionDecimal = commissionRate / 100;
  const mamacitosFee = Math.round(saleAmount * commissionDecimal);
  const netSellerPayout = Math.round(saleAmount - mamacitosFee);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulating(true);

    setTimeout(() => {
      const newTx: DiscreetTransaction = {
        id: `TX-${Math.floor(1000000 + Math.random() * 9000000)}`,
        buyerUserId: testBuyerId || 'MMC-USER-ANON',
        sellerUserId: testSellerId || 'MMC-CREATOR-PRO',
        sellerName: 'Prestadora Registrada',
        itemTitle: 'Pago Discreto de Servicio / Contenido',
        amount: Number(saleAmount),
        commissionRate: commissionDecimal,
        commissionAmount: mamacitosFee,
        netPayout: netSellerPayout,
        status: 'COMPLETED',
        timestamp: new Date().toLocaleString('es-MX')
      };

      setSimTransactions([newTx, ...simTransactions]);
      setSimulating(false);
      alert(`¡Transferencia Discreta Ejecutada con Éxito!\n\nID Transacción: ${newTx.id}\nMantenida 100% Anónima.`);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="text-center mb-12">
        <span className="bg-brand-pink text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Mamacitos Protocol • Seguridad Creadores & Usuarios
        </span>
        <h1 className="text-4xl md:text-5xl font-heading text-white mt-3">
          Sistema de Pagos Discretos & Análisis de Costos
        </h1>
        <p className="mt-4 text-xl text-brand-purple-light max-w-3xl mx-auto">
          Transacciones anónimas de ID a ID. El usuario paga a Mamacitos sin revelar su tarjeta ni su nombre al prestador, y Mamacitos libera inmediatamente el pago al prestador sin revelar datos bancarios ni telefónicos.
        </p>
      </div>

      {/* Architecture Overview Diagram */}
      <div className="bg-brand-slate p-8 rounded-2xl border border-gray-700 shadow-2xl mb-12">
        <h2 className="text-2xl font-heading text-white mb-6 text-center">
          ¿Cómo Funciona la Discreción Absoluta de Pagos?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center relative">
          <div className="bg-brand-deep-purple/80 p-6 rounded-xl border border-brand-purple-light/20 relative">
            <div className="w-12 h-12 bg-brand-pink/20 text-brand-pink rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              1
            </div>
            <h3 className="font-bold text-lg text-white mb-1">Usuario Comprador</h3>
            <p className="text-xs text-brand-purple-light font-mono font-bold mb-2">ID: MMC-USER-8921</p>
            <p className="text-xs text-gray-300">
              Paga directamente a la bóveda de Mamacitos. Su nombre real, tarjeta y celular <strong>NUNCA</strong> son revelados a la prestadora.
            </p>
          </div>

          <div className="bg-brand-purple/40 p-6 rounded-xl border border-brand-pink/40 shadow-xl relative">
            <div className="w-12 h-12 bg-brand-pink text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              2
            </div>
            <h3 className="font-bold text-lg text-white mb-1">Bóveda Mamacitos (Intermediario)</h3>
            <p className="text-xs text-brand-lime font-mono font-bold mb-2">Comisión de Privilegio (10% - 15%)</p>
            <p className="text-xs text-gray-300">
              Valida los fondos, emite el comprobante por ID de Usuario y procesa la dispersión inmediata reteniendo únicamente la comisión por el privilegio de privacidad.
            </p>
          </div>

          <div className="bg-brand-deep-purple/80 p-6 rounded-xl border border-brand-purple-light/20 relative">
            <div className="w-12 h-12 bg-brand-pink/20 text-brand-pink rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-xl">
              3
            </div>
            <h3 className="font-bold text-lg text-white mb-1">Prestadora / Creadora</h3>
            <p className="text-xs text-brand-purple-light font-mono font-bold mb-2">ID: MMC-CREATOR-4012</p>
            <p className="text-xs text-gray-300">
              Recibe la notificación inmediata con el saldo acreditado a su ID. Ningún dato de su cuenta personal o teléfono queda expuesto al cliente.
            </p>
          </div>
        </div>
      </div>

      {/* Calculator & Simulator Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Interactive Cost & Fee Calculator */}
        <div className="bg-brand-slate p-8 rounded-2xl border border-gray-700 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-brand-pink/20 rounded-lg text-brand-pink">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-heading text-white">Calculadora de Comisión & Ganancia Mamacitos</h2>
          </div>

          <p className="text-xs text-gray-300 mb-6">
            Ajusta los valores para analizar la rentabilidad de la plataforma y el pago neto que recibe la creadora de contenido.
          </p>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-300">Monto de la Transacción ($ MXN):</span>
                <span className="text-brand-pink font-mono text-base">${saleAmount} MXN</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={saleAmount}
                onChange={e => setSaleAmount(Number(e.target.value))}
                className="w-full accent-brand-pink bg-gray-700 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-300">Tasa de Comisión por Privilegio de Discreción (%):</span>
                <span className="text-brand-lime font-mono text-base">{commissionRate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="1"
                value={commissionRate}
                onChange={e => setCommissionRate(Number(e.target.value))}
                className="w-full accent-brand-lime bg-gray-700 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Results Breakdown Box */}
            <div className="bg-black/40 p-5 rounded-xl border border-gray-700 space-y-3 font-mono text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Pago Inicial Usuario:</span>
                <span className="text-white font-bold">${saleAmount} MXN</span>
              </div>
              <div className="flex justify-between text-brand-pink">
                <span>Comisión Generada para Mamacitos ({commissionRate}%):</span>
                <span className="font-bold">+ ${mamacitosFee} MXN</span>
              </div>
              <div className="flex justify-between text-green-400 pt-2 border-t border-gray-800 text-sm">
                <span>Pago Neto Inmediato a Creadora:</span>
                <span className="font-bold font-heading">${netSellerPayout} MXN</span>
              </div>
            </div>

            <div className="bg-brand-deep-purple/60 p-4 rounded-xl text-xs text-gray-300 space-y-2 border border-brand-purple-light/20">
              <h4 className="font-bold text-white text-sm">Análisis de Costos Operativos de Mamacitos:</h4>
              <ul className="list-disc pl-4 space-y-1 text-gray-300">
                <li>Procesamiento bancario / pasarela segura: ~2.9% + $3.00 MXN.</li>
                <li>Cifrado de datos de usuario & servidores de protección de identidad: ~1.5%.</li>
                <li><strong>Margen Neto Promedio para Mamacitos:</strong> ~{Math.max(1, commissionRate - 4.5).toFixed(1)}% de beneficio limpio por cada transacción procesada.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Live Simulator Form */}
        <div className="bg-brand-slate p-8 rounded-2xl border border-gray-700 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-brand-lime/20 rounded-lg text-brand-lime">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-heading text-white">Simulador de Transacción Inmediata</h2>
          </div>

          <form onSubmit={handleSimulatePayment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">ID de Usuario Comprador</label>
              <input
                type="text"
                value={testBuyerId}
                onChange={e => setTestBuyerId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-xs text-brand-pink font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">ID de Usuario Creadora / Prestadora</label>
              <input
                type="text"
                value={testSellerId}
                onChange={e => setTestSellerId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-xs text-gray-200 font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Monto a Enviar ($ MXN)</label>
              <input
                type="number"
                value={saleAmount}
                onChange={e => setSaleAmount(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm text-brand-lime font-mono font-bold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={simulating}
              className="w-full bg-gradient-to-r from-brand-pink to-brand-purple hover:brightness-110 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {simulating ? 'Procesando Bóveda de Discreción...' : 'Ejecutar Transferencia por ID de Usuario'}
            </button>
          </form>

          {/* Audit Trail List */}
          <div className="mt-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Historial de Transacciones Anónimas Registradas
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {simTransactions.map(tx => (
                <div key={tx.id} className="bg-black/40 p-3 rounded-xl border border-gray-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono text-brand-pink font-bold">{tx.id}</span>
                    <p className="text-[11px] text-gray-400">
                      {tx.buyerUserId} ➔ {tx.sellerUserId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white font-mono">${tx.amount} MXN</p>
                    <p className="text-[10px] text-brand-lime">Comisión: ${tx.commissionAmount} MXN</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DiscreetPaymentsPage;
