import { useState, useEffect, useCallback } from 'react';

export type ReportReason =
  | 'impersonation_fake'
  | 'stolen_media'
  | 'financial_fraud'
  | 'harassment_extortion'
  | 'underage_concern'
  | 'automated_bot'
  | 'terms_violation';

export type ReportStatus =
  | 'pending_audit'
  | 'profile_sanctioned'
  | 'reporter_sanctioned'
  | 'educational_notice'
  | 'sanction_reversed';

export interface ProfileReport {
  id: string;
  profileId: number;
  profileName: string;
  profileCode: string;
  reporterUserId: string;
  reason: ReportReason;
  description: string;
  evidenceUrl?: string;
  createdAt: string;
  status: ReportStatus;
  resolutionNotes?: string;
  sanctionType?: 'profile_suspension' | 'reporter_warning' | 'reporter_ban' | 'appeal_restoration';
  resolvedAt?: string;
}

const STORAGE_KEY = 'mamacitos_safety_reports_v1';
const EVENT_NAME = 'mamacitos_reports_updated';

export const REASON_LABELS: Record<ReportReason, { title: string; desc: string }> = {
  impersonation_fake: {
    title: 'Suplantación de Identidad / Perfil Falso (Catfish)',
    desc: 'La persona en las imágenes no corresponde a quien administra la cuenta o utiliza identidad ajena.'
  },
  stolen_media: {
    title: 'Uso No Autorizado de Fotos / Contenido Robado',
    desc: 'Material visual tomado sin consentimiento de creadoras de contenido u otras plataformas.'
  },
  financial_fraud: {
    title: 'Fraude Financiero o Intento de Estafa',
    desc: 'Exigencia de transferencias previas fraudulentas, pagos simulados o engaños monetarios.'
  },
  harassment_extortion: {
    title: 'Acoso, Extorsión o Violación de Confidencialidad',
    desc: 'Amenazas de divulgar datos privados, extorsión o intimidación a usuarios o prestadoras.'
  },
  underage_concern: {
    title: 'Sospecha de Minoría de Edad o Perfil No Elegible',
    desc: 'Incumplimiento del requisito estricto de mayoría legal de edad (+18 años).'
  },
  automated_bot: {
    title: 'Cuenta Automatizada / Bot de Spam',
    desc: 'Envío de enlaces externos maliciosos, scripts masivos o comportamiento no humano.'
  },
  terms_violation: {
    title: 'Incumplimiento de Términos de la Comunidad',
    desc: 'Conductas indebidas o infracciones a las políticas de respeto y discreción de Mamacitos.'
  }
};

const INITIAL_DEMO_REPORTS: ProfileReport[] = [
  {
    id: 'REP-2026-8941',
    profileId: 104,
    profileName: 'Dominique Royale',
    profileCode: 'MMC-6420',
    reporterUserId: 'MMC-USER-1104',
    reason: 'stolen_media',
    description: 'Reporte preventivo sobre fotografía en reel promocional externo.',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    status: 'educational_notice',
    resolutionNotes: 'El perfil comprobó derechos de autor originales con video liveness. Se notificó al reportante de buena fe sobre el estándar de verificación sin aplicar sanción.',
    sanctionType: 'reporter_warning',
    resolvedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'REP-2026-9210',
    profileId: 105,
    profileName: 'Perfil Sospechoso Bot-Test',
    profileCode: 'MMC-9901',
    reporterUserId: 'MMC-USER-3420',
    reason: 'impersonation_fake',
    description: 'Cuenta usando imágenes no verificadas y solicitando depósitos de inmediato sin confirmar identidad.',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    status: 'profile_sanctioned',
    resolutionNotes: 'Auditoría confirmó inconsistencia biométrica frente a documento INE. Perfil suspendido y dado de baja permanentemente.',
    sanctionType: 'profile_suspension',
    resolvedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString()
  },
  {
    id: 'REP-2026-9554',
    profileId: 101,
    profileName: 'Camila & Valeria',
    profileCode: 'MMC-7701',
    reporterUserId: 'MMC-USER-MALICIOUS-99',
    reason: 'terms_violation',
    description: 'Reporte infundado intentando despublicar perfil de la competencia.',
    createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    status: 'reporter_sanctioned',
    resolutionNotes: 'Se comprobó que el reporte era falso y malicioso con intención de sabotaje comercial. Se suspendió la cuenta del reportante por 14 días.',
    sanctionType: 'reporter_ban',
    resolvedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 'REP-2026-9812',
    profileId: 102,
    profileName: 'Grace Miller',
    profileCode: 'MMC-9842',
    reporterUserId: 'MMC-USER-4819',
    reason: 'impersonation_fake',
    description: 'Sospecha sobre perfil internacional sin corroborar pasaporte.',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: 'sanction_reversed',
    resolutionNotes: 'Tras revisión y apelación expedita, la titular presentó pasaporte oficial y verificación biométrica AI-Verified al 99.8%. Sanción preventiva revertida y visibilidad prioritaria compensatoria otorgada.',
    sanctionType: 'appeal_restoration',
    resolvedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];

export const getStoredReports = (): ProfileReport[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REPORTS));
      return INITIAL_DEMO_REPORTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading safety reports:', err);
    return INITIAL_DEMO_REPORTS;
  }
};

export const saveStoredReports = (reports: ProfileReport[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { count: reports.length } }));
  } catch (err) {
    console.error('Error saving safety reports:', err);
  }
};

export const submitProfileReport = (params: {
  profileId: number;
  profileName: string;
  profileCode: string;
  reason: ReportReason;
  description: string;
  evidenceUrl?: string;
  honeypotValue?: string;
}): { success: boolean; ticketId?: string; error?: string } => {
  // 1. Honeypot check: automated bot detection
  if (params.honeypotValue && params.honeypotValue.trim() !== '') {
    console.warn('[Anti-Bot] Honeypot triggered on report submission. Dropping silently.');
    return { success: false, error: 'Solicitud no permitida.' };
  }

  // 2. Cooldown check: prevent report spam for the same profile
  const existing = getStoredReports();
  const recentDuplicate = existing.find(
    r => r.profileId === params.profileId &&
    Date.now() - new Date(r.createdAt).getTime() < 30 * 60 * 1000 // 30 minutes cooldown
  );

  if (recentDuplicate) {
    return {
      success: false,
      error: 'Ya existe un reporte reciente para este perfil en proceso de auditoría. Tu solicitud ya está en la cola de revisión.'
    };
  }

  // 3. Generate confidential report ticket
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `REP-${new Date().getFullYear()}-${randomSuffix}`;

  const newReport: ProfileReport = {
    id: ticketId,
    profileId: params.profileId,
    profileName: params.profileName,
    profileCode: params.profileCode,
    reporterUserId: 'MMC-USER-ACTIVE',
    reason: params.reason,
    description: params.description.trim(),
    evidenceUrl: params.evidenceUrl?.trim(),
    createdAt: new Date().toISOString(),
    status: 'pending_audit'
  };

  saveStoredReports([newReport, ...existing]);
  return { success: true, ticketId };
};

export const updateReportStatus = (
  reportId: string,
  newStatus: ReportStatus,
  resolutionNotes: string,
  sanctionType?: ProfileReport['sanctionType']
) => {
  const reports = getStoredReports();
  const updated = reports.map(r => {
    if (r.id === reportId) {
      return {
        ...r,
        status: newStatus,
        resolutionNotes,
        sanctionType,
        resolvedAt: new Date().toISOString()
      };
    }
    return r;
  });
  saveStoredReports(updated);
};

export const reverseSanction = (reportId: string, reversalReason: string) => {
  updateReportStatus(
    reportId,
    'sanction_reversed',
    reversalReason || 'Sanción revocada tras verificación de autenticidad documental y apelación legítima.',
    'appeal_restoration'
  );
};

export const useSafetyReports = () => {
  const [reports, setReports] = useState<ProfileReport[]>(() => getStoredReports());

  const sync = useCallback(() => {
    setReports(getStoredReports());
  }, []);

  useEffect(() => {
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener('storage', sync);
    };
  }, [sync]);

  return {
    reports,
    submitReport: submitProfileReport,
    updateStatus: updateReportStatus,
    reverseSanction,
    refresh: sync
  };
};

export default useSafetyReports;
