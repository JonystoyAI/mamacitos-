import React, { useState } from 'react';
import { 
  AlertTriangle, ShieldAlert, Flag, CheckCircle2, X, Lock, 
  HelpCircle, RefreshCw, FileText, Scale, Eye, UserX, UserCheck, 
  Sparkles, Info, Clock, AlertCircle, Send
} from 'lucide-react';
import { 
  ReportReason, 
  REASON_LABELS, 
  submitProfileReport, 
  useSafetyReports, 
  ProfileReport 
} from '../../src/utils/safetyReports';
import { Profile } from '../../types';

interface ReportProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const ReportProfileModal: React.FC<ReportProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const { reports, reverseSanction } = useSafetyReports();
  const [activeTab, setActiveTab] = useState<'report' | 'protocol' | 'audit_log'>('report');

  // Form state
  const [selectedReason, setSelectedReason] = useState<ReportReason>('impersonation_fake');
  const [description, setDescription] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; ticketId?: string; error?: string } | null>(null);

  // Reversal test state
  const [reversalNotes, setReversalNotes] = useState('');
  const [selectedReportToReverse, setSelectedReportToReverse] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    setTimeout(() => {
      const result = submitProfileReport({
        profileId: profile.id,
        profileName: profile.name,
        profileCode: profile.userIdCode,
        reason: selectedReason,
        description,
        evidenceUrl,
        honeypotValue: honeypot
      });

      setSubmitting(false);
      setSubmissionResult(result);
      if (result.success) {
        setDescription('');
        setEvidenceUrl('');
        setAgreedTerms(false);
      }
    }, 600);
  };

  const handleExecuteReversal = (reportId: string) => {
    reverseSanction(
      reportId,
      reversalNotes.trim() || 'Sanción revocada con éxito tras comprobación biométrica oficial y apelación legítima.'
    );
    setSelectedReportToReverse(null);
    setReversalNotes('');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in text-neutral-100"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl relative max-h-[90vh] flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Centro de Reporte Discreto & Seguridad
                </h2>
                <span className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px] font-mono px-2 py-0.5 rounded">
                  {profile.userIdCode}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Auditoría confidencial para el perfil de <strong className="text-white">{profile.name}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors"
            title="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 text-xs font-semibold gap-1">
          <button
            type="button"
            onClick={() => { setActiveTab('report'); setSubmissionResult(null); }}
            className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'report'
                ? 'border-rose-500 text-white bg-neutral-900/60 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Flag className="w-3.5 h-3.5 text-rose-400" />
            <span>Emitir Reporte</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('protocol')}
            className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'protocol'
                ? 'border-amber-500 text-white bg-neutral-900/60 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Protocolo & Sanciones</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit_log')}
            className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'audit_log'
                ? 'border-emerald-500 text-white bg-neutral-900/60 font-bold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Historial & Reversión ({reports.length})</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">

          {/* TAB 1: SUBMIT REPORT */}
          {activeTab === 'report' && (
            <div>
              {submissionResult?.success ? (
                /* Success View */
                <div className="bg-neutral-900/90 border border-emerald-500/50 rounded-xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/50 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Reporte Registrado con Éxito
                    </span>
                    <h3 className="text-lg font-bold text-white">Ticket Confidencial: {submissionResult.ticketId}</h3>
                    <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                      El equipo de auditoría y confianza revisará este reporte en un plazo máximo de <strong>2 horas</strong>. La titular de la cuenta jamás será notificada de tu identidad.
                    </p>
                  </div>

                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-[11px] text-neutral-400 text-left font-mono space-y-1">
                    <div>• <strong>Perfil auditado:</strong> {profile.name} ({profile.userIdCode})</div>
                    <div>• <strong>Categoría:</strong> {REASON_LABELS[selectedReason].title}</div>
                    <div>• <strong>Protección:</strong> Tu ID permanece cifrado bajo el protocolo Mamacitos IAM.</div>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmissionResult(null)}
                      className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold py-2 px-4 rounded-lg border border-neutral-700 transition-colors"
                    >
                      Enviar Otro Detalle
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-emerald-600 hover:bg-emerald-500 text-neutral-950 text-xs font-bold py-2 px-5 rounded-lg transition-colors shadow"
                    >
                      Entendido / Cerrar
                    </button>
                  </div>
                </div>
              ) : (
                /* Report Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {submissionResult?.error && (
                    <div className="bg-rose-950/80 border border-rose-500/80 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{submissionResult.error}</span>
                    </div>
                  )}

                  {/* Honeypot field (hidden from visual users, caught by bots) */}
                  <input
                    type="text"
                    name="contact_honeypot_safety"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Reason Selection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Motivo del Reporte:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(Object.keys(REASON_LABELS) as ReportReason[]).map((rKey) => {
                        const item = REASON_LABELS[rKey];
                        const isSelected = selectedReason === rKey;
                        return (
                          <button
                            key={rKey}
                            type="button"
                            onClick={() => setSelectedReason(rKey)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'bg-rose-950/70 border-rose-500 text-white shadow-xs'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                            }`}
                          >
                            <span className="text-xs font-bold block mb-1">{item.title}</span>
                            <span className="text-[10px] text-neutral-400 leading-tight">{item.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-bold text-neutral-200">Descripción detallada del incidente:</label>
                      <span className="text-[10px] text-neutral-400 font-mono">{description.length}/500</span>
                    </div>
                    <textarea
                      required
                      maxLength={500}
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Explica qué anomalía detectaste (ej. fotos pertenecientes a otra modelo, solicitud sospechosa de dinero, etc.)..."
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-xs rounded-xl p-3 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/30 transition-all"
                    />
                  </div>

                  {/* Evidence URL (optional) */}
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300">Enlace o referencia de evidencia (opcional):</label>
                    <input
                      type="url"
                      value={evidenceUrl}
                      onChange={(e) => setEvidenceUrl(e.target.value)}
                      placeholder="https://... enlace público o fuente original comprobable"
                      className="w-full bg-neutral-950 border border-neutral-800 text-neutral-100 placeholder-neutral-500 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-neutral-600"
                    />
                  </div>

                  {/* Anti-Malicious Warning & User Agreement */}
                  <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300">
                      <Scale className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Política Anti-Abuso y Reportes Maliciosos</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      Para salvaguardar el trabajo y dignidad de las prestadoras de servicios, <strong>queda estrictamente prohibido emitir reportes falsos, calumniosos o con fines de sabotaje comercial</strong>. Los reportes son auditados individualmente; los usuarios que envíen reportes maliciosos infundados serán sancionados con la suspensión definitiva de su cuenta.
                    </p>
                    <label className="flex items-start gap-2 pt-1 cursor-pointer select-none text-[11px] font-semibold text-white">
                      <input
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-rose-500 focus:ring-0"
                      />
                      <span>Declaro bajo protesta de decir verdad que este reporte es legítimo y objetivo.</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold py-2.5 px-4 rounded-xl border border-neutral-800 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting || !description.trim() || !agreedTerms}
                      className="bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Cifrando y Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Enviar Reporte Confidencial</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: DETAILED SAFETY PROTOCOL & SANCTION MATRIX */}
          {activeTab === 'protocol' && (
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold text-amber-400 tracking-wider">
                  Marco Regulatorio Mamacitos
                </span>
                <h3 className="text-sm font-bold text-white">
                  Procedimiento de Manejo de Reportes, Sanciones y Reversiones
                </h3>
                <p className="text-neutral-300 text-xs">
                  Para mantener un espacio seguro y libre de abusos, el protocolo opera bajo una arquitectura de <strong>Defensa en Profundidad</strong> con 4 vías de resolución:
                </p>
              </div>

              {/* Protocol Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Prevención Anti-Sabotaje */}
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-blue-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>1. Prevención de Reportes Innecesarios</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    • <strong>Cooldown de 30 minutos</strong> por perfil/cuenta para neutralizar brigadas de reportes.<br />
                    • <strong>Honeypots invisibles</strong> que detectan y descartan scripts automatizados sin procesar.<br />
                    • Ponderación de confianza según antigüedad y nivel de verificación de la cuenta reportante.
                  </p>
                </div>

                {/* 2. Sanción a Infractores Confirmados */}
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-rose-400">
                    <UserX className="w-3.5 h-3.5" />
                    <span>2. Sanción a Infractor Confirmado</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Si la investigación manual confirma suplantación de identidad, estafa o extorsión:<br />
                    • <strong>Baja inmediata y suspensión permanente</strong> del perfil infractor.<br />
                    • Inclusión de la huella biométrica y número telefónico en la lista negra de seguridad.
                  </p>
                </div>

                {/* 3. Sanción a Reportantes Maliciosos */}
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>3. Sanción por Reporte Malicioso</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Cuando un reporte carece totalmente de fundamentos y se prueba dolo, venganza o sabotaje comercial:<br />
                    • <strong>Suspensión temporal de 14 a 30 días</strong> al reportante en primera ofensa.<br />
                    • Baneo permanente si se demuestra intento reiterado de dañar a una prestadora legítima.
                  </p>
                </div>

                {/* 4. Notificación Educativa por Error */}
                <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>4. Notificación por Error de Buena Fe</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Si el usuario reportó por una confusión genuina (ej. dudas sobre un alias artístico o localidad):<br />
                    • <strong>No se impone sanción alguna</strong> al reportante.<br />
                    • Se envía un mensaje informativo explicando por qué el perfil está en regla, cuidando la armonía comunitaria.
                  </p>
                </div>
              </div>

              {/* 5. Procedimiento de Reversión */}
              <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>5. Procedimiento de Apelación y Reversión de Sanciones</span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Cualquier prestadora o usuario sancionado preventivamente tiene derecho a una <strong>apelación expedita</strong> presentando video selfie de liveness en tiempo real con su documento oficial. Una vez revalidada la autenticidad, la moderación ejecuta la <strong>Reversión de Sanción</strong>, reestablece la cuenta en menos de 15 minutos y compensa a la prestadora con 48 horas de visibilidad Top VIP sin costo.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT LOG & REVERSAL CONSOLE */}
          {activeTab === 'audit_log' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 pb-1">
                <span>Registro de casos auditados y resoluciones disciplinarias:</span>
                <span className="font-mono text-neutral-500">{reports.length} registros</span>
              </div>

              {/* Reports list */}
              <div className="space-y-2.5">
                {reports.map((r: ProfileReport) => {
                  const isCurrentProfile = r.profileId === profile.id;
                  return (
                    <div 
                      key={r.id}
                      className={`p-3.5 rounded-xl border space-y-2 text-xs transition-colors ${
                        isCurrentProfile 
                          ? 'bg-neutral-900 border-neutral-700' 
                          : 'bg-neutral-950 border-neutral-850'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-white text-[11px]">{r.id}</span>
                          <span className="text-neutral-400">• Perfil: <strong className="text-neutral-200">{r.profileName}</strong> ({r.profileCode})</span>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {r.status === 'pending_audit' && (
                            <span className="bg-amber-950/80 text-amber-300 border border-amber-600 text-[10px] font-bold px-2 py-0.5 rounded">
                              ⏳ En Auditoría
                            </span>
                          )}
                          {r.status === 'profile_sanctioned' && (
                            <span className="bg-rose-950/80 text-rose-300 border border-rose-600 text-[10px] font-bold px-2 py-0.5 rounded">
                              ⛔ Perfil Sancionado
                            </span>
                          )}
                          {r.status === 'reporter_sanctioned' && (
                            <span className="bg-purple-950/80 text-purple-300 border border-purple-600 text-[10px] font-bold px-2 py-0.5 rounded">
                              ⚖️ Reportante Malicioso Sancionado
                            </span>
                          )}
                          {r.status === 'educational_notice' && (
                            <span className="bg-cyan-950/80 text-cyan-300 border border-cyan-600 text-[10px] font-bold px-2 py-0.5 rounded">
                              ℹ️ Notificación por Error
                            </span>
                          )}
                          {r.status === 'sanction_reversed' && (
                            <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-400" /> Sanción Revertida
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-300">
                        <strong className="text-neutral-400">Motivo:</strong> {REASON_LABELS[r.reason]?.title || r.reason}
                      </div>

                      <p className="text-[11px] text-neutral-400 italic bg-neutral-900/50 p-2 rounded border border-neutral-800/80">
                        &ldquo;{r.description}&rdquo;
                      </p>

                      {r.resolutionNotes && (
                        <div className="text-[11px] text-neutral-300 bg-neutral-900/80 border border-neutral-800 p-2 rounded space-y-0.5">
                          <span className="font-bold text-emerald-400 text-[10px] uppercase font-mono block">
                            Resolución de Moderación:
                          </span>
                          <span>{r.resolutionNotes}</span>
                        </div>
                      )}

                      {/* Reversal Action for Sanctioned Profiles */}
                      {r.status === 'profile_sanctioned' && (
                        <div className="pt-1 flex items-center justify-end">
                          {selectedReportToReverse === r.id ? (
                            <div className="w-full space-y-2 bg-neutral-900 p-2.5 rounded-lg border border-neutral-700">
                              <label className="text-[11px] text-neutral-300 block">
                                Motivo de la Reversión / Pruebas de Apelación Aportadas:
                              </label>
                              <input
                                type="text"
                                value={reversalNotes}
                                onChange={(e) => setReversalNotes(e.target.value)}
                                placeholder="Ej. Presentó pasaporte oficial y prueba biométrica liveness 99.8%."
                                className="w-full bg-neutral-950 border border-neutral-700 text-xs text-white p-1.5 rounded"
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedReportToReverse(null)}
                                  className="text-[11px] text-neutral-400 hover:text-white px-2 py-1"
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleExecuteReversal(r.id)}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-[11px] px-3 py-1 rounded"
                                >
                                  Ejecutar Reversión de Sanción
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSelectedReportToReverse(r.id)}
                              className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 hover:bg-emerald-950/40 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
                            >
                              <RefreshCw className="w-3 h-3" />
                              <span>Revertir Sanción (Apelación)</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Disclaimer */}
        <div className="border-t border-neutral-800 pt-3 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-neutral-500" /> Confidencialidad & Cifrado E2EE
          </span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-white text-neutral-400"
          >
            Cerrar ventana
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportProfileModal;
