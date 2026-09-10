import React, { useState } from 'react';
import { ShieldCheck, Lock, Globe, Upload, FileText, CheckCircle2, AlertTriangle, Eye, EyeOff, ArrowRight, ArrowLeft, RefreshCw, PhoneCall, UserCheck, Sparkles, Check } from 'lucide-react';
import VerifiedBadge from '../common/VerifiedBadge';

interface VerificationStepProgressProps {
  onVerificationComplete?: (docType: string, docNumber: string) => void;
  initialVerifiedState?: boolean;
}

export const VerificationStepProgress: React.FC<VerificationStepProgressProps> = ({
  onVerificationComplete,
  initialVerifiedState = false,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [docType, setDocType] = useState<'INE' | 'Pasaporte' | 'Licencia' | 'Cedula'>('INE');
  
  // Step 1: Uploads
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [isUploadingFront, setIsUploadingFront] = useState<boolean>(false);
  const [isUploadingBack, setIsUploadingBack] = useState<boolean>(false);

  // Step 2: Form Data
  const [legalName, setLegalName] = useState<string>('');
  const [docNumber, setDocNumber] = useState<string>('');
  const [emergencyPhone, setEmergencyPhone] = useState<string>('');
  const [emergencyContactName, setEmergencyContactName] = useState<string>('');

  // Step 3: Transparency Acknowledgment
  const [hasAcceptedTransparency, setHasAcceptedTransparency] = useState<boolean>(false);

  // Step 4: Verification Submission State
  const [isSimulatingValidation, setIsSimulatingValidation] = useState<boolean>(false);
  const [validationProgress, setValidationProgress] = useState<number>(0);
  const [validationStepText, setValidationStepText] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(initialVerifiedState);

  // Simulate file upload
  const handleSimulateUpload = (side: 'front' | 'back') => {
    if (side === 'front') {
      setIsUploadingFront(true);
      setTimeout(() => {
        setFrontImage('https://picsum.photos/seed/id-front/600/400');
        setIsUploadingFront(false);
      }, 1000);
    } else {
      setIsUploadingBack(true);
      setTimeout(() => {
        setBackImage('https://picsum.photos/seed/id-back/600/400');
        setIsUploadingBack(false);
      }, 1000);
    }
  };

  // Start verification scan animation
  const handleStartScan = () => {
    setCurrentStep(4);
    setIsSimulatingValidation(true);
    setValidationProgress(10);
    setValidationStepText('Iniciando lectura óptica de documento oficial...');

    setTimeout(() => {
      setValidationProgress(35);
      setValidationStepText('Verificando hologramas y biometría facial...');
    }, 1000);

    setTimeout(() => {
      setValidationProgress(70);
      setValidationStepText('Comprobando registro en base de datos cifrada y teléfono de emergencia...');
    }, 2200);

    setTimeout(() => {
      setValidationProgress(100);
      setValidationStepText('¡Validación exitosa! Emitiendo insignia de verificación oficial.');
      setIsSimulatingValidation(false);
      setIsVerified(true);
      if (onVerificationComplete) {
        onVerificationComplete(docType, docNumber);
      }
    }, 3400);
  };

  const steps = [
    { number: 1, title: 'Documentación ID', icon: FileText, subtitle: 'Carga de Identificación' },
    { number: 2, title: 'Datos de Seguridad', icon: Lock, subtitle: 'Información Confidencial' },
    { number: 3, title: 'Transparencia de Datos', icon: ShieldCheck, subtitle: 'Público vs Privado' },
    { number: 4, title: 'Verificación Oficial', icon: Sparkles, subtitle: 'Emisión de Insignia' },
  ];

  return (
    <div className="bg-brand-slate rounded-3xl border border-gray-700/80 p-6 sm:p-8 shadow-2xl space-y-8 animate-fade-in">
      
      {/* HEADER & STEP PROGRESS BAR */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-brand-lime text-brand-purple-dark text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                PROCESO DE VERIFICACIÓN GUIADO
              </span>
              <span className="text-xs text-gray-400 font-mono">Paso {currentStep} de 4</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading text-white mt-1">
              Guía de Verificación de Identidad Oficial
            </h2>
          </div>

          {/* Status Badge */}
          {isVerified ? (
            <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-2xl flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-left">
                <span className="text-xs font-extrabold block">Cuenta Verificada</span>
                <span className="text-[10px] text-emerald-400 font-mono">Insignia Activa</span>
              </div>
            </div>
          ) : (
            <div className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-4 py-2 rounded-2xl flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <div className="text-left">
                <span className="text-xs font-extrabold block">Pendiente de Registro</span>
                <span className="text-[10px] text-amber-300 font-mono">Completa los 4 pasos</span>
              </div>
            </div>
          )}
        </div>

        {/* STEPPER NAVIGATION BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.number;
            const isCompleted = currentStep > s.number || isVerified;

            return (
              <button
                key={s.number}
                onClick={() => {
                  // Allow jumping back to earlier steps or forward if filled
                  if (s.number <= currentStep || isCompleted) {
                    setCurrentStep(s.number);
                  }
                }}
                disabled={s.number > currentStep && !isCompleted}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-pink/20 to-brand-deep-purple/40 border-brand-pink text-white shadow-lg scale-[1.02]'
                    : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/30'
                    : 'bg-gray-900/60 border-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className={`p-1.5 rounded-xl ${isActive ? 'bg-brand-pink text-white' : isCompleted ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold opacity-70">0{s.number}</span>
                </div>

                <span className="text-xs font-bold block truncate">{s.title}</span>
                <span className="text-[10px] opacity-75 block truncate font-mono">{s.subtitle}</span>

                {isCompleted && !isActive && (
                  <div className="absolute top-2 right-2 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: DOCUMENT TYPE & IMAGE UPLOADS */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-lg font-heading text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-pink" />
              Paso 1: Selecciona y Carga tu Documento Oficial
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Sube una fotografía clara del frente y vuelta de tu identificación vigente. Se utiliza únicamente para verificar la mayoría de edad (+18) y autenticidad del titular.
            </p>

            {/* Document Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { id: 'INE', label: 'INE / Creadencial', desc: 'México (Vigente)' },
                { id: 'Pasaporte', label: 'Pasaporte', desc: 'Oficial Internacional' },
                { id: 'Licencia', label: 'Licencia', desc: 'Conducir Vigente' },
                { id: 'Cedula', label: 'Cédula', desc: 'Profesional' },
              ].map((doc) => (
                <button
                  type="button"
                  key={doc.id}
                  onClick={() => setDocType(doc.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    docType === doc.id
                      ? 'bg-brand-pink text-white border-brand-pink shadow-lg font-bold'
                      : 'bg-gray-800/80 text-gray-300 border-gray-700 hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xs block font-bold">{doc.label}</span>
                  <span className="text-[10px] opacity-75 block">{doc.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Dropzones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Front Image Dropzone */}
            <div className="bg-gray-900/90 p-5 rounded-2xl border border-gray-800 space-y-3 text-center">
              <span className="text-xs font-bold text-gray-300 block">FRENTE / ANVERSO DEL DOCUMENTO</span>
              
              {frontImage ? (
                <div className="relative rounded-xl overflow-hidden border border-emerald-500/50 group">
                  <img src={frontImage} alt="Anverso ID" className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setFrontImage(null)}
                      className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold"
                    >
                      Cambiar Foto
                    </button>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-emerald-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Foto Frente Lista
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handleSimulateUpload('front')}
                  disabled={isUploadingFront}
                  className="w-full h-36 border-2 border-dashed border-gray-700 hover:border-brand-pink rounded-xl flex flex-col items-center justify-center p-4 gap-2 transition-all bg-gray-950/50 group"
                >
                  <Upload className="w-8 h-8 text-gray-500 group-hover:text-brand-pink transition-colors" />
                  <span className="text-xs text-gray-300 font-bold">
                    {isUploadingFront ? 'Cargando imagen...' : 'Cargar Foto Frente'}
                  </span>
                  <span className="text-[10px] text-gray-500">JPG, PNG o WEBP (Máx. 10MB)</span>
                </button>
              )}
            </div>

            {/* Back Image Dropzone */}
            <div className="bg-gray-900/90 p-5 rounded-2xl border border-gray-800 space-y-3 text-center">
              <span className="text-xs font-bold text-gray-300 block">REVERSO / REVERSO DEL DOCUMENTO</span>
              
              {backImage ? (
                <div className="relative rounded-xl overflow-hidden border border-emerald-500/50 group">
                  <img src={backImage} alt="Reverso ID" className="w-full h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setBackImage(null)}
                      className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg font-bold"
                    >
                      Cambiar Foto
                    </button>
                  </div>
                  <span className="absolute bottom-2 left-2 bg-emerald-500 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Foto Reverso Lista
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => handleSimulateUpload('back')}
                  disabled={isUploadingBack}
                  className="w-full h-36 border-2 border-dashed border-gray-700 hover:border-brand-pink rounded-xl flex flex-col items-center justify-center p-4 gap-2 transition-all bg-gray-950/50 group"
                >
                  <Upload className="w-8 h-8 text-gray-500 group-hover:text-brand-pink transition-colors" />
                  <span className="text-xs text-gray-300 font-bold">
                    {isUploadingBack ? 'Cargando imagen...' : 'Cargar Foto Reverso'}
                  </span>
                  <span className="text-[10px] text-gray-500">JPG, PNG o WEBP (Máx. 10MB)</span>
                </button>
              )}
            </div>

          </div>

          {/* Privacy Note */}
          <div className="bg-gray-950/80 p-4 rounded-2xl border border-gray-800 flex items-start gap-3 text-xs text-gray-300">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">🔒 Garantía de Protección de Documentos:</strong>
              <span>Las fotografías subidas se encriptan mediante algoritmo AES-256 en servidores seguros. NUNCA se mostrarán públicamente en tu perfil ni se venderán a terceros.</span>
            </div>
          </div>

          {/* Next Step Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => {
                if (!frontImage || !backImage) {
                  // Pre-fill for easy test UX
                  setFrontImage('https://picsum.photos/seed/id-front/600/400');
                  setBackImage('https://picsum.photos/seed/id-back/600/400');
                }
                setCurrentStep(2);
              }}
              className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 shadow-lg"
            >
              <span>Siguiente: Datos de Seguridad</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: INTERNAL SAFETY FIELDS & EMERGENCY CONTACT */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="text-lg font-heading text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              Paso 2: Registro de Datos de Seguridad & Emergencia
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Los siguientes datos se almacenan exclusivamente en el área de seguridad confidencial para validación y auxilio mediante el <strong className="text-white">Botón de Pánico Mamacitos</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Legal Full Name */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-300">Nombre Completo Legal</label>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> 🔒 Interno / Privado
                  </span>
                </div>
                <input
                  type="text"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  placeholder="Ej. María Fernanda López Pérez"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-pink"
                />
              </div>

              {/* Document Folio Number */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-300">Clave o Folio del Documento ({docType})</label>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> 🔒 Interno / Privado
                  </span>
                </div>
                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  placeholder="Ej. IDMEX203910283921"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-pink"
                />
              </div>

              {/* Emergency Phone */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-300">Teléfono de Contacto de Emergencia</label>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <PhoneCall className="w-2.5 h-2.5" /> 🔒 Botón de Pánico
                  </span>
                </div>
                <input
                  type="tel"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-pink"
                />
              </div>

              {/* Emergency Contact Name */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-gray-300">Nombre de la Persona de Confianza</label>
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[9px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> 🔒 Interno / Privado
                  </span>
                </div>
                <input
                  type="text"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  placeholder="Ej. Mamá / Hermano / Amigo cercano"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-brand-pink"
                />
              </div>

            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 px-5 rounded-xl text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => {
                if (!docNumber) setDocNumber('IDMEX9821039812');
                if (!emergencyPhone) setEmergencyPhone('+52 55 9876 5432');
                setCurrentStep(3);
              }}
              className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 shadow-lg"
            >
              <span>Siguiente: Transparencia de Privacidad</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TRANSPARENCY BREAKDOWN (INTERNAL vs PUBLIC FIELDS) */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-heading text-white">
                Paso 3: Matriz de Transparencia de Datos
              </h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Queremos que tengas absoluta tranquilidad. A continuación se detalla con precisión qué datos se mantienen bajo estricto secreto de seguridad y cuáles son los únicos elementos públicos en tu perfil.
            </p>

            {/* COMPARISON MATRIX GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* LEFT COLUMN: SECURE / PRIVATE FIELDS */}
              <div className="bg-gray-950 p-5 rounded-2xl border border-amber-500/40 space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                  <Lock className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider block">
                      🔒 DATOS ALMACENADOS CON CIFRADO
                    </h4>
                    <span className="text-[10px] text-gray-400">Jamás visibles para clientes ni terceros</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <span><strong>Fotografías del Documento:</strong> Frente y Reverso de {docType}.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <span><strong>Nombre Legal Completo:</strong> {legalName || 'Almacenado de forma privada'}.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <span><strong>Número de Folio / Clave:</strong> {docNumber || 'IDMEX9821...'}.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <span><strong>Teléfono de Emergencia:</strong> {emergencyPhone || '+52 55...'}.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                    <span><strong>Ubicación GPS Exacta:</strong> Sólo activa si presionas el Botón de Pánico.</span>
                  </li>
                </ul>

                <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-[11px] text-amber-200">
                  ✓ Uso exclusivo para prevención de fraude, verificación +18 y protocolo de seguridad personal.
                </div>
              </div>

              {/* RIGHT COLUMN: PUBLIC PROFILE FIELDS */}
              <div className="bg-gray-950 p-5 rounded-2xl border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider block">
                      🌐 DATOS PÚBLICOS EN TU PERFIL
                    </h4>
                    <span className="text-[10px] text-gray-400">Lo único que verán tus visitantes y clientes</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>Insignia de Verificación Oficial:</strong> Badge dorado/verde con estatus Aprobado.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>Nombre Artístico / Alias:</strong> Tu pseudónimo de elección.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>Código de ID Público:</strong> Código seguro de referencia (ej. MMC-9821).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    <span><strong>Nivel de Reputación:</strong> Calificaciones aprobadas por ti.</span>
                  </li>
                </ul>

                <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-[11px] text-emerald-200">
                  ✓ Incrementa hasta en un 300% la confianza de clientes de alto nivel.
                </div>
              </div>

            </div>

            {/* Acceptance Checkbox */}
            <div className="bg-black/50 p-4 rounded-2xl border border-gray-800 flex items-center gap-3 pt-3">
              <input
                type="checkbox"
                id="transparency-accept"
                checked={hasAcceptedTransparency}
                onChange={(e) => setHasAcceptedTransparency(e.target.checked)}
                className="w-5 h-5 rounded text-brand-pink focus:ring-brand-pink bg-gray-800 border-gray-700 cursor-pointer"
              />
              <label htmlFor="transparency-accept" className="text-xs text-gray-200 cursor-pointer font-bold select-none">
                Comprendo claramente la separación entre mis datos privados de seguridad y mi insignia pública de verificación.
              </label>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 px-5 rounded-xl text-xs flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              onClick={() => {
                setHasAcceptedTransparency(true);
                handleStartScan();
              }}
              className="bg-gradient-to-r from-brand-pink to-brand-deep-purple hover:brightness-110 text-white font-extrabold py-3.5 px-8 rounded-xl text-xs flex items-center gap-2 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-brand-lime" />
              <span>Iniciar Verificación Biométrica Oficial</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SCANNER SIMULATION & VERIFICATION COMPLETE */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fade-in text-center">
          
          {isSimulatingValidation ? (
            <div className="bg-gray-950 p-8 rounded-3xl border border-brand-pink/50 space-y-6 max-w-lg mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-brand-pink/20 border border-brand-pink text-brand-pink flex items-center justify-center mx-auto animate-pulse">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-heading text-white">Validando Documento con Sistema Oficial</h3>
                <p className="text-xs text-gray-300 font-mono">{validationStepText}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden p-0.5 border border-gray-700">
                <div
                  className="bg-gradient-to-r from-brand-pink via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${validationProgress}%` }}
                ></div>
              </div>

              <span className="text-xs text-gray-400 font-mono block">{validationProgress}% Completado</span>
            </div>
          ) : (
            
            /* FINAL VERIFIED SUCCESS STATE */
            <div className="bg-gradient-to-b from-gray-900 via-brand-slate to-gray-950 p-8 sm:p-12 rounded-3xl border border-emerald-500/50 space-y-6 shadow-2xl">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 border border-emerald-400/50 rounded-full flex items-center justify-center mx-auto shadow-xl animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="max-w-xl mx-auto space-y-3">
                <span className="bg-emerald-500 text-black text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-widest shadow-md">
                  VERIFICACIÓN OFICIAL APROBADA
                </span>
                
                <h3 className="text-3xl font-heading text-white">
                  ¡Felicidades! Tu Perfil es Oficialmente Seguro
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Has completado exitosamente la validación de tu documento <strong className="text-white">{docType}</strong>. Tu insignia de autenticidad ya está visible públicamente en tu perfil.
                </p>
              </div>

              {/* Official Badge Card Display */}
              <div className="max-w-md mx-auto bg-black/80 p-6 rounded-2xl border border-gray-700 shadow-xl space-y-4">
                <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                  <span className="text-xs font-bold text-gray-400">Estatus de Cuenta:</span>
                  <VerifiedBadge isVerified={true} docType={docType} userIdCode="MMC-9821" size="md" variant="official" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Tipo de Documento:</span>
                    <strong className="text-white">{docType} Verificado</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Línea de Emergencia:</span>
                    <strong className="text-emerald-400">✓ Activa y Cifrada</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 px-5 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Volver a Revisar Pasos</span>
                </button>

                <button
                  onClick={() => alert('Insignia Oficial lista para mostrarse en tu Landing Page VIP y perfil público.')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold py-3 px-6 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xl"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ver mi Perfil Público</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default VerificationStepProgress;
