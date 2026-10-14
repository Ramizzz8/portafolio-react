// Los textos traducibles van como { es, en }; Projects.jsx elige según el idioma activo.
// `cover`: portada diseñada (opcional). Si no hay, se genera una a partir de `image`.

export const featuredProjects = [
  {
    id: 1,
    title: 'Novacapital SAS',
    tagline: {
      es: 'Créditos por libranza',
      en: 'Payroll-deduction loans',
    },
    description: {
      es: 'Plataforma web de créditos por libranza para pensionados y empleados públicos. Incluye simulador de cuotas, gestión de solicitudes y clientes, reportes y un panel de administración con autenticación por roles.',
      en: 'Web platform for payroll-deduction loans aimed at retirees and public employees. Includes a payment simulator, application and client management, reports and an admin panel with role-based authentication.',
    },
    technologies: ['Python', 'Flask', 'MySQL', 'React', 'Tailwind CSS'],
    image: 'images/novacapital-cover.webp',
    cover: true,
    imagePosition: 'left center',
    github: 'https://github.com/Ramizzz8/Novacapital-SAS',
    live: null,
    color: '#e63946',
  },
  {
    id: 2,
    title: 'Moves Location',
    tagline: {
      es: 'Gestión migratoria digital',
      en: 'Digital immigration management',
    },
    description: {
      es: 'Plataforma web para la gestión de procesos migratorios. Permite a usuarios subir y administrar sus documentos, con un panel de administración para seguimiento de casos y validación documental.',
      en: 'Web platform for managing immigration processes. Users can upload and manage their documents, with an admin panel for case tracking and document validation.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask'],
    image: 'images/moves-location.webp',
    github: 'https://github.com/Ramizzz8/Moves-Location',
    live: null,
    color: '#3a86ff',
  },
]

export const otherProjects = [
  {
    id: 3,
    title: 'Tienda Online',
    description: {
      es: 'Ecommerce responsivo con carrito de compras y pasarela de pago.',
      en: 'Responsive e-commerce site with shopping cart and payment gateway.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'images/tienda.webp',
    github: 'https://github.com/Ramizzz8/Tienda-Online',
  },
  {
    id: 4,
    title: 'Sistema de Inventarios',
    description: {
      es: 'Gestión completa de productos con Flask. Agregar, editar y eliminar inventario.',
      en: 'Full product management with Flask. Add, edit and remove inventory.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask'],
    image: 'images/inventario.webp',
    github: null,
  },
  {
    id: 5,
    title: 'Periódico Digital',
    description: {
      es: 'Publicación de noticias con panel de administración para redactores.',
      en: 'News publishing site with an admin panel for editors.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python'],
    image: 'images/periodico.webp',
    github: null,
  },
  {
    id: 6,
    title: 'RamiSearch',
    description: {
      es: 'Buscador web propio con diseño minimalista y resultados optimizados.',
      en: 'Custom web search engine with a minimalist design and optimized results.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python'],
    image: 'images/ramisearch.webp',
    github: null,
  },
]
