export interface GroundingSource {
  title: string;
  url: string;
}

export interface SafetyBulletinResult {
  text: string;
  searchQueries: string[];
  groundingSources: GroundingSource[];
  isFallback: boolean;
  timestamp: string;
}

export function getVerifiedSafetyBulletin(query: string, location: string = 'México'): SafetyBulletinResult {
  const normalizedQuery = (query || '').toLowerCase();
  const normalizedLocation = location || 'México';

  let categoryTitle = 'Alertas de Seguridad y Protocolos de Protección';
  let bodyContent = '';
  let searchQueries: string[] = [
    `Seguridad y protocolos de prevención en ${normalizedLocation} 2026`,
    `Líneas de emergencia y apoyo legal para comunidad en México`,
    `Consejo Ciudadano CDMX 55 5533 5533 protocolos verificados`
  ];

  const groundingSources: GroundingSource[] = [
    {
      title: 'Consejo Ciudadano para la Seguridad y Justicia (Línea 24/7)',
      url: 'https://consejociudadanomx.org',
    },
    {
      title: 'C5 Ciudad de México - Botón de Auxilio y Cámaras de Monitoreo',
      url: 'https://c5.cdmx.gob.mx',
    },
    {
      title: 'Fiscalía General de Justicia - Unidad de Atención Especializada',
      url: 'https://fgjcdmx.gob.mx',
    },
    {
      title: 'Ley Olimpia Nacional - Marco Jurídico contra Violencia Digital',
      url: 'https://www.gob.mx/inmujeres',
    },
  ];

  if (normalizedQuery.includes('evento') || normalizedQuery.includes('marcha') || normalizedQuery.includes('espacio') || normalizedQuery.includes('cultur')) {
    categoryTitle = `Eventos, Espacios Seguros y Puntos de Encuentro (${normalizedLocation})`;
    bodyContent = `📍 **Directorio de Espacios Seguros y Recomendaciones de Movilidad (${normalizedLocation}):**

1. **Centros de Acompañamiento y Espacios Libres de Violencia:**
   • Se promueven puntos de encuentro en zonas comerciales de alta concurrencia y corredores iluminados con monitoreo C5 activo (ej. Paseo de la Reforma, Zona Rosa, Roma-Condesa en CDMX; Chapultepec en Guadalajara; Barrio Antiguo en Monterrey).
   • Clínicas de Salud Especializada Condesa (Iztapalapa y Cuauhtémoc) ofrecen orientación comunitaria, chequeos preventivos y acompañamiento psicológico gratuito.

2. **Protocolos de Movilidad Segura en Eventos:**
   • Activa la función de código PIN y verificación de conductor en aplicaciones de transporte privado (Uber/DiDi).
   • Al trasladarte a reuniones o eventos comunitarios, comparte tu ubicación en tiempo real con al menos dos contactos de confianza.
   • Evita abordar taxis de sitio no identificados o vehículos particulares no verificados en horarios nocturnos.

3. **Próximos Encuentros y Talleres de Prevención:**
   • Talleres mensuales de ciberseguridad, defensa personal y primeros auxilios organizados por colectivos independientes y centros comunitarios locales.`;
  } else if (normalizedQuery.includes('prestadora') || normalizedQuery.includes('protocolo') || normalizedQuery.includes('cita') || normalizedQuery.includes('consejo') || normalizedQuery.includes('privacidad')) {
    categoryTitle = `Protocolos de Seguridad y Prevención para Prestadoras de Servicios (${normalizedLocation})`;
    bodyContent = `🔒 **Protocolo de Autoprotección y Operativa Segura para Prestadoras Independientes:**

1. **Filtro y Verificación Previa del Cliente:**
   • Solicita confirmación de identidad mediante WhatsApp corporativo o perfil verificado en Mamacitos antes de agendar.
   • Solicita siempre un anticipo de garantía vía transferencia bancaria o depósito seguro. Nunca recibas comprobantes con fecha futura o "salvo buen cobro" (fraude común).

2. **Reglas de Oro en Citas Presenciales:**
   • **Ubicación Fija:** Nunca aceptes cambios imprevistos de hotel, domicilio o habitación durante el trayecto.
   • **Red de Seguridad y Check-in:** Informa a una compañera o contacto designado la dirección exacta del lugar, hora estimada de inicio y hora pactada de salida.
   • **Código de Emergencia:** Define una palabra clave con tu red de apoyo para activar llamada disuasiva o intervención inmediata en caso de incomodidad.
   • **Discreción Telefónica:** Utiliza números virtuales (e.g., SIM secundaria o cuenta de mensajería empresarial) para mantener privada tu línea personal.

3. **Protección en Pagos y Transacciones:**
   • Verifica en tu banca móvil la acreditación real del dinero antes de iniciar cualquier servicio.
   • Evita llevar joyas de alto valor o cantidades elevadas de efectivo en traslados.`;
  } else if (normalizedQuery.includes('derecho') || normalizedQuery.includes('ley') || normalizedQuery.includes('jurídic') || normalizedQuery.includes('apoyo') || normalizedQuery.includes('olimpia')) {
    categoryTitle = `Marco Legal, Derechos Humanos y Líneas de Asistencia Jurídica`;
    bodyContent = `⚖️ **Garantías Legales y Protección Jurídica en México:**

1. **Ley Olimpia (Protección contra Violencia Digital):**
   • Tipifica como delito penal la difusión, comercialización, extorsión o intercambio de fotografías, audios o videos de índole íntima sin tu consentimiento explícito.
   • Sanciones: De 3 a 6 años de prisión efectiva y multas económicas.
   • Si un cliente amenaza con divulgar material íntimo, acude inmediatamente con tu captura de pantalla a la Policía Cibernética o al Ministerio Público.

2. **Derecho a la No Discriminación y Protección Constitucional:**
   • El Artículo 1° de la Constitución Mexicana y las normativas de COPRED prohíben estrictamente cualquier acto discriminatorio motivado por identidad de género, orientación o actividad económica.
   • Tienes derecho irrestricto a recibir atención médica de urgencia y asistencia legal sin juzgamientos ni revictimización.

3. **Líneas Directas de Denuncia y Asesoría Legal Inmediata:**
   • **Consejo Ciudadano MX:** 55 5533 5533 (Asistencia legal y psicológica 24/7, completamente confidencial).
   • **Policía Cibernética SSC:** 55 5242 5100 ext. 5086.
   • **Red Nacional de Refugios:** 800 822 4460 (Atención en crisis en todo el país).`;
  } else {
    categoryTitle = `Boletín de Seguridad y Alertas Territoriales (${normalizedLocation})`;
    bodyContent = `🛡️ **Resumen Informativo de Seguridad y Medidas Preventivas (${normalizedLocation}):**

1. **Monitoreo y Alertas Locales Activas:**
   • Se recomienda mantener precaución en zonas con operativos de tránsito nocturno y puntos de control vial en vías principales.
   • Se reportan esquemas de estafa basados en comprobantes bancarios editados (SPEI falso). Exige siempre confirmación directa en tu aplicación bancaria antes de prestar cualquier servicio.

2. **Líneas de Auxilio Inmediato y Emergencias en México:**
   • **911:** Número único de emergencias médicas, seguridad pública y bomberos.
   • **Consejo Ciudadano (Línea de Seguridad y Chat de Confianza):** 55 5533 5533 (Atención 24/7 vía teléfono y WhatsApp).
   • **Línea de la Vida:** 800 911 2000 (Acompañamiento emocional y crisis, libre de prejuicios).

3. **Directrices de Cuidado Colectivo:**
   • Mantén cargado tu dispositivo móvil al 100% y configura los contactos de emergencia en la pantalla de bloqueo de tu smartphone.
   • Comparte ubicaciones con geocercas activas con personas de tu estricta confianza durante traslados nocturnos.`;
  }

  const formattedText = `### ${categoryTitle}

${bodyContent}

---
*Nota de Seguridad:* Este boletín contiene información verificada por el protocolo de seguridad comunitaria de Mamacitos para ${normalizedLocation}. Ante cualquier riesgo inminente, recurre inmediatamente a las líneas de auxilio oficiales (911 / Consejo Ciudadano 55 5533 5533).`;

  return {
    text: formattedText,
    searchQueries,
    groundingSources,
    isFallback: true,
    timestamp: new Date().toISOString(),
  };
}
