import { BlogArticle, BlogCategory } from '../../types';

const STORAGE_KEY = 'mamacitos_blog_articles_v1';

export const BLOG_CATEGORIES: { id: BlogCategory | 'all'; label: string; icon: string; description: string }[] = [
  { id: 'all', label: 'Todos los Artículos', icon: '🔥', description: 'Explora todas las publicaciones y novedades' },
  { id: 'insights', label: 'Mamacitos Insights', icon: '📊', description: 'Datos demográficos, tendencias y estadísticas de búsqueda en México' },
  { id: 'creators', label: 'Guías de Creadores', icon: '💡', description: 'Consejos de producción, iluminación, monetización y crecimiento' },
  { id: 'wellness', label: 'Salud & Bienestar', icon: '🌿', description: 'Prevención, PrEP, salud mental, autocuidado y consentimiento' },
  { id: 'community', label: 'Comunidad & Spotlight', icon: '🌟', description: 'Historias de éxito, entrevistas exclusivas y voces trans' },
  { id: 'safety', label: 'Seguridad & Privacidad', icon: '🛡️', description: 'Ciberseguridad, anonimato, cobros discretos y protección legal' }
];

const INITIAL_ARTICLES: BlogArticle[] = [
  {
    id: 'insights-mexico-2026',
    title: 'Mamacitos Insights: Radiografía de las identidades, términos y preferencias más buscadas en México',
    slug: 'mamacitos-insights-mexico-tendencias-2026',
    summary: 'Nuestro equipo analiza millones de interacciones discretas para revelar cómo han evolucionado las búsquedas de parejas trans, sissies, roles versátiles y fetiches en todo el país.',
    content: `
### El cambio cultural en la exploración de género y deseo

Durante los últimos doce meses, el comportamiento de navegación en Mamacitos ha demostrado una transformación sustancial hacia la apertura, la autenticidad y el respeto mutuo. Lejos de los estigmas tradicionales, los usuarios buscan cada vez más experiencias personalizadas y transparentes.

#### 1. Auge de las búsquedas de Parejas y Colectivos
Las búsquedas que involucran modalidades compartidas como **"Pareja Trans y Trans"**, **"Pareja H y Trans"** y **"Pareja H y H"** crecieron un impresionante **142%** respecto al año anterior. La comunidad busca cada vez más conexiones genuinas en entornos seguros y verificados.

#### 2. Términos de Rol: El fin de las etiquetas rígidas
El rol **"Versátil"** lidera las preferencias con un 48% de las selecciones totales, seguido por dinámicas de exploración como **"Feminización"** y **"Transformación"**, las cuales han dejado de ser tabú para convertirse en espacios de juego consensuado de alta demanda.

#### 3. Ciudades con mayor actividad per cápita
1. **Ciudad de México** (Alcaldías Cuauhtémoc, Juárez y Benito Juárez)
2. **Guadalajara y Zapopan**
3. **Monterrey y San Pedro Garza García**
4. **Querétaro**
5. **Puebla y Cholula**

#### 4. La prioridad absoluta: Higiene y Salud Sexual
El filtro **"Solo con condón"** y perfiles que muestran distintivos de **"Pruebas de salud al día"** reciben en promedio un **78% más de mensajes directos** que perfiles sin especificación, confirmando que la cultura de cuidado mutuo es el valor número uno en Mamacitos.
    `,
    category: 'insights',
    categoryLabel: 'Mamacitos Insights',
    coverImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    authorId: 'MMC-STAFF',
    authorName: 'Equipo Editorial Mamacitos',
    authorAvatar: '/assets/aistudio/icono-del-sitio_c366d75b.png',
    authorRole: 'Investigación & Datos',
    isAuthorVerified: true,
    isAuthorPremium: true,
    publishedAt: '24 Oct 2026',
    readTimeMinutes: 5,
    likesCount: 342,
    viewsCount: 2890,
    tags: ['Mamacitos Insights', 'Tendencias', 'Diversidad', 'Estadísticas México'],
    isFeatured: true
  },
  {
    id: 'creator-monetization-guide',
    title: 'Guía de Monetización para Creadoras: Cómo fijar tus tarifas y optimizar tus propinas discretas',
    slug: 'guia-monetizacion-creadoras-tarifas-propinas',
    summary: 'Aprende a estructurar un menú de servicios transparente, utilizar el sistema de pagos discretos y fidelizar a clientes de alto perfil sin comprometer tu seguridad.',
    content: `
### Valorar tu tiempo y profesionalismo

Monetizar tu presencia de manera exitosa requiere estrategia, claridad de límites y herramientas tecnológicas que resguarden tu identidad financiera. En esta guía desglosamos las mejores prácticas recomendadas por las creadoras Top VIP de Mamacitos.

#### 1. Define tu Menú de Servicios y Políticas
- **Claridad desde el inicio:** Especifica qué incluye tu atención (tiempo de tolerancia, ubicación, servicios adicionales) y qué prácticas no realizas bajo ninguna circunstancia.
- **Términos de cancelación:** Solicita depósitos de apartado a través de la pasarela de pagos discretos para blindar tu agenda frente a cancelaciones de último minuto.

#### 2. La ventaja de los Pagos Discretos de Mamacitos
A diferencia de transferencias bancarias directas (que exponen tu nombre real o CLABE), el sistema de saldo discreto de Mamacitos protege tus datos bancarios y permite que el cliente reciba un cargo con concepto mercantil neutro.

#### 3. Producción de Reels y Contenido Exclusivo
Los perfiles que publican Reels cortos de bienvenida y galerías de calidad editorial registran una tasa de conversión tres veces mayor. Los clientes aprecian la autenticidad, la pulcritud y la presencia estética.
    `,
    category: 'creators',
    categoryLabel: 'Guías de Creadores',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    authorId: 'MMC-9821',
    authorName: 'Valentina Luxe',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    authorRole: 'Creadora VIP & Blogger',
    isAuthorVerified: true,
    isAuthorPremium: true,
    publishedAt: '22 Oct 2026',
    readTimeMinutes: 6,
    likesCount: 215,
    viewsCount: 1640,
    tags: ['Monetización', 'Creadoras', 'Finanzas Discretas', 'Tips VIP']
  },
  {
    id: 'wellness-prep-care',
    title: 'Cultura de Cuidado & Salud Sexual: PrEP, chequeos rutinarios y acuerdos previos',
    slug: 'cultura-cuidado-salud-sexual-prep-acuerdos',
    summary: 'Todo lo que necesitas saber sobre prevención combinada, profilaxis pre-exposición (PrEP), pruebas rápidas en México y cómo comunicar tus límites con confianza.',
    content: `
### Tu cuerpo, tus reglas: La salud como pilar innegociable

El placer y el trabajo íntimo deben coexistir siempre con la tranquilidad psicológica y física. La información científica actualizada es la herramienta más poderosa para protegerte y proteger a quienes te rodean.

#### Prevención Combinada: Más allá de una sola barrera
- **PrEP (Profilaxis Pre-Exposición):** En México, diversas instituciones públicas y clínicas especializadas (como las Clínicas Condesa en CDMX) ofrecen programas de acceso a PrEP gratuita o a bajo costo.
- **Uso riguroso de preservativos y lubricantes a base de agua o silicona:** Garantizan la integridad de la barrera de látex o poliuretano.
- **Pruebas trimestrales:** Realizar un panel completo de ITS cada 3 a 6 meses es una práctica de excelencia profesional que genera confianza inmediata.

#### Cómo establecer acuerdos previos sin incomodidad
Antes de concretar un encuentro, deja claras tus pautas sanitarias: "En mis sesiones la protección con condón es obligatoria y no negociable". Quien respeta tus límites sanitarios respeta tu integridad.
    `,
    category: 'wellness',
    categoryLabel: 'Salud & Bienestar',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    authorId: 'MMC-HEALTH',
    authorName: 'Dra. Sofía Mendoza',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    authorRole: 'Especialista en Salud Sexual',
    isAuthorVerified: true,
    isAuthorPremium: true,
    publishedAt: '20 Oct 2026',
    readTimeMinutes: 4,
    likesCount: 428,
    viewsCount: 3120,
    tags: ['PrEP', 'Salud Sexual', 'Prevención', 'Bienestar']
  },
  {
    id: 'safety-digital-privacy',
    title: 'Seguridad Digital en 2026: Cómo blindar tu número, ubicación e identidad en línea',
    slug: 'seguridad-digital-blindar-numero-ubicacion-identidad',
    summary: 'Protocolos de ciberseguridad para creadores y usuarios: teléfonos secundarios, metadatos en fotografías, geolocalización segura y prevención de doxing.',
    content: `
### La regla de oro: Compartimentación de tu vida digital

En internet, la prevención técnica es infinitamente más sencilla que remediar una filtración. Aplica estos 5 principios de seguridad:

1. **Elimina Metadatos EXIF de tus fotos:** Antes de subir cualquier foto tomada en tu domicilio, asegúrate de que no contenga coordenadas GPS ni marcas de tiempo en los datos de la cámara. Mamacitos limpia automáticamente los metadatos de las fotos subidas a la plataforma.
2. **Números virtuales o SIMs secundarias:** Jamás vincules tu número personal bancario o de WhatsApp familiar a tu actividad pública. Utiliza números virtuales (eSIM) exclusivos para contacto profesional.
3. **Botón de Pánico y Contacto de Emergencia:** Mantén configurado en tu perfil de Mamacitos tu contacto de emergencia de confianza.
4. **Fondos neutros en sesiones:** Evita ventanas con vistas reconocibles de edificios o placas de autos en tus Reels y galerías.
    `,
    category: 'safety',
    categoryLabel: 'Seguridad & Privacidad',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    authorId: 'MMC-SEC',
    authorName: 'Equipo de Ciberseguridad Mamacitos',
    authorAvatar: '/assets/aistudio/icono-del-sitio_c366d75b.png',
    authorRole: 'DevSecOps & Privacidad',
    isAuthorVerified: true,
    isAuthorPremium: true,
    publishedAt: '18 Oct 2026',
    readTimeMinutes: 5,
    likesCount: 189,
    viewsCount: 1450,
    tags: ['Seguridad Digital', 'Anonimato', 'Privacidad', 'Anti-Doxing']
  },
  {
    id: 'community-grace-story',
    title: 'Voz de la Comunidad: Grace y el arte de la alta moda y la libertad en Mamacitos',
    slug: 'comunidad-grace-historia-alta-moda-libertad',
    summary: 'Una conversación íntima con Grace sobre cómo diseñar un perfil con estética editorial, empoderamiento trans y la creación de una comunidad fiel.',
    content: `
### De la discreción al orgullo editorial

Grace, destacada creadora con sede en Querétaro y Ciudad de México, nos cuenta cómo la sofisticación visual y la claridad en las normas de convivencia transformaron su carrera.

> *"Cuando decidí que mi perfil no fuera una tarjeta genérica, sino una editorial de revista de moda, todo cambió. Los clientes entendieron de inmediato que estaban ante una profesional que cuida cada detalle de la experiencia."*

#### La importancia de los Reels y el estilo visual
En su perfil, Grace combina fotografías en blanco y negro de alto contraste con videos dinámicos donde comparte su pasión por el cine, la moda y las conversaciones profundas. "El contacto previo por voz permite filtrar a personas serias y respetuosas antes de cualquier encuentro presencial".
    `,
    category: 'community',
    categoryLabel: 'Comunidad & Spotlight',
    coverImage: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80',
    authorId: 'MMC-GRACE-01',
    authorName: 'Grace',
    authorAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    authorRole: 'Creadora Editorial Top',
    isAuthorVerified: true,
    isAuthorPremium: true,
    publishedAt: '15 Oct 2026',
    readTimeMinutes: 4,
    likesCount: 512,
    viewsCount: 3890,
    tags: ['Spotlight', 'Entrevista', 'Comunidad Trans', 'Querétaro']
  }
];

export const getStoredArticles = (): BlogArticle[] => {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ARTICLES));
      }
      return INITIAL_ARTICLES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading blog articles from storage', err);
    return INITIAL_ARTICLES;
  }
};

export const saveNewArticle = (newArticleData: Omit<BlogArticle, 'id' | 'slug' | 'publishedAt' | 'likesCount' | 'viewsCount'>): BlogArticle => {
  const current = getStoredArticles();
  const slug = newArticleData.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const newArticle: BlogArticle = {
    ...newArticleData,
    id: `article-${Date.now()}`,
    slug: `${slug}-${Date.now().toString().slice(-4)}`,
    publishedAt: new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date()),
    likesCount: 1,
    viewsCount: 12
  };

  const updated = [newArticle, ...current];
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch (err) {
    console.error('Error saving new article', err);
  }
  return newArticle;
};

export const toggleArticleLike = (articleId: string): { liked: boolean; count: number } => {
  const current = getStoredArticles();
  const likedKey = `mamacitos_liked_art_${articleId}`;
  const isLiked = typeof localStorage !== 'undefined' ? localStorage.getItem(likedKey) === 'true' : false;

  const updated = current.map(art => {
    if (art.id === articleId) {
      const nextCount = isLiked ? Math.max(0, art.likesCount - 1) : art.likesCount + 1;
      return { ...art, likesCount: nextCount };
    }
    return art;
  });

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(likedKey, (!isLiked).toString());
    }
  } catch (err) {
    console.error('Error toggling like', err);
  }

  const found = updated.find(a => a.id === articleId);
  return { liked: !isLiked, count: found ? found.likesCount : 0 };
};

export const isArticleLiked = (articleId: string): boolean => {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(`mamacitos_liked_art_${articleId}`) === 'true';
};
