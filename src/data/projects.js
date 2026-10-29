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
    technologies: ['Python', 'Flask', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    image: 'images/novacapital-cover.webp',
    cover: true,
    imagePosition: 'left center',
    github: 'https://github.com/Ramizzz8/Novacapital-SAS',
    live: 'https://novacapital.andresrami.com',
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
    live: 'https://moves.andresrami.com',
    color: '#3a86ff',
  },
  {
    id: 11,
    title: 'GEOFORA',
    tagline: {
      es: 'El mundo, país a país · Proyecto Intermodular',
      en: 'The world, country by country · Final-year project',
    },
    description: {
      es: 'Globo terráqueo 3D interactivo en el que cada país se tiñe según sus noticias de las últimas 24 horas. Al pulsar un país se abre su ficha: datos básicos, noticias de sus medios traducidas al español, su música, su cultura y una galería de fotos.',
      en: 'Interactive 3D globe where each country is shaded by its news from the last 24 hours. Clicking a country opens its page: key facts, news from its own media translated into Spanish, its music, its culture and a photo gallery.',
    },
    technologies: ['React', 'Three.js', 'Python', 'FastAPI', 'SQLite', 'Docker'],
    image: 'images/proyectos/geofora.webp',
    github: 'https://github.com/Ramizzz8/geofora',
    live: 'https://geofora.andresrami.com',
    color: '#f59e0b',
  },
  {
    id: 3,
    title: 'Camarón Viviendas',
    tagline: {
      es: 'Portal inmobiliario con panel de gestión',
      en: 'Real estate portal with admin panel',
    },
    description: {
      es: 'Portal inmobiliario con buscador por localidad, tipo, precio y habitaciones, fichas con galería y un panel privado para publicar, editar y eliminar viviendas con sus fotos. Login con contraseñas cifradas, protección CSRF y consultas preparadas.',
      en: 'Real estate portal with search by town, type, price and bedrooms, detail pages with photo galleries and a private panel to publish, edit and delete listings with their photos. Hashed-password login, CSRF protection and prepared statements.',
    },
    technologies: ['PHP', 'MySQL', 'PDO', 'JavaScript', 'CSS'],
    image: 'images/proyectos/camaron-viviendas.webp',
    github: 'https://github.com/Ramizzz8/camaron-viviendas',
    live: null,
    color: '#f2644e',
  },
  {
    id: 4,
    title: 'Laboratorio de IA local',
    tagline: {
      es: 'Chat, búsqueda semántica y RAG en local',
      en: 'Local chat, semantic search and RAG',
    },
    description: {
      es: 'Aplicación con tres herramientas de IA que se ejecutan en el propio equipo: chat con un modelo de lenguaje en streaming, buscador semántico sobre apuntes con embeddings y ChromaDB que responde citando fuentes (RAG) y un saneador de transcripciones.',
      en: 'App with three AI tools running entirely on your own machine: a streaming chat with a language model, a semantic search engine over notes using embeddings and ChromaDB that answers with cited sources (RAG), and a transcript cleaner.',
    },
    technologies: ['Python', 'Flask', 'Ollama', 'ChromaDB', 'JavaScript'],
    image: 'images/proyectos/laboratorio-ia.webp',
    github: 'https://github.com/Ramizzz8/laboratorio-ia-local',
    live: null,
    color: '#8b5cf6',
  },
  {
    id: 10,
    title: 'Brújula de temas',
    tagline: {
      es: 'Detección de temas por voz con embeddings',
      en: 'Voice topic detection with embeddings',
    },
    description: {
      es: 'Escucha lo que dices (o lo que escribes) y una aguja apunta en tiempo real al tema del que estás hablando. Una gráfica marca cada cambio de tema a lo largo de la conversación. El modelo de lenguaje se ejecuta en el propio navegador.',
      en: 'It listens to what you say (or type) and a needle points in real time to the topic you are talking about. A chart marks every change of topic along the conversation. The language model runs right in the browser.',
    },
    technologies: ['JavaScript', 'Canvas', 'Transformers.js', 'Web Speech API', 'PHP', 'Ollama'],
    image: 'images/proyectos/brujula-temas.webp',
    github: 'https://github.com/Ramizzz8/portafolio-react/tree/main/public/demos/brujula-temas',
    live: '/demos/brujula-temas/',
    color: '#4a90d9',
  },
]

export const otherProjects = [
  {
    id: 5,
    title: 'Intérprete Python web',
    description: {
      es: 'Editor y terminal de Python en el navegador. Ejecuta cada programa en un proceso aislado con límite de tiempo y simula las entradas de input().',
      en: 'Python editor and terminal in the browser. Runs each program in an isolated process with a time limit and simulates input() entries.',
    },
    technologies: ['Python', 'Flask', 'JavaScript'],
    image: 'images/proyectos/interprete-python.webp',
    github: 'https://github.com/Ramizzz8/interprete-python-web',
    live: null,
    color: '#22c55e',
  },
  {
    id: 6,
    title: 'Simulación de personajes',
    description: {
      es: 'Agentes autónomos con movimiento trigonométrico, rebotes y colisiones. La física está escrita en Python (API Flask) y en JavaScript con Canvas.',
      en: 'Autonomous agents with trigonometric movement, bounces and collisions. The physics is written in Python (Flask API) and in JavaScript with Canvas.',
    },
    technologies: ['Python', 'Flask', 'JavaScript', 'Canvas'],
    image: 'images/proyectos/simulacion-npcs.webp',
    github: 'https://github.com/Ramizzz8/simulacion-npcs',
    live: 'https://ramizzz8.github.io/simulacion-npcs/',
    color: '#2dd4bf',
  },
  {
    id: 7,
    title: 'Sudoku · Backtracking',
    description: {
      es: 'Sudoku jugable con generador propio por backtracking que garantiza solución única. Tres niveles, notas a lápiz, pistas y deshacer.',
      en: 'Playable sudoku with a custom backtracking generator that guarantees a unique solution. Three levels, pencil notes, hints and undo.',
    },
    technologies: ['Python', 'Flask', 'JavaScript'],
    image: 'images/proyectos/sudoku.webp',
    github: 'https://github.com/Ramizzz8/sudoku-backtracking',
    live: 'https://ramizzz8.github.io/sudoku-backtracking/',
    color: '#6d5df6',
  },
  {
    id: 8,
    title: 'PhotoStudio Lite',
    description: {
      es: 'Editor de dibujo en el navegador: pinceles, formas, bote de pintura, cuentagotas, texto, filtros y deshacer. Hecho con la API de Canvas, sin librerías.',
      en: 'In-browser drawing editor: brushes, shapes, paint bucket, eyedropper, text, filters and undo. Built with the Canvas API, no libraries.',
    },
    technologies: ['JavaScript', 'Canvas', 'CSS'],
    image: 'images/proyectos/photostudio.webp',
    github: 'https://github.com/Ramizzz8/photostudio-lite',
    live: 'https://ramizzz8.github.io/photostudio-lite/',
    color: '#a78bfa',
  },
  {
    id: 9,
    title: 'Microtienda',
    description: {
      es: 'Tienda online de estilo cartoon con catálogo desde MySQL, carrito persistente y pedidos guardados en una transacción con precios validados en el servidor.',
      en: 'Cartoon-style online shop with a MySQL catalogue, persistent cart and orders saved in a transaction with server-validated prices.',
    },
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    image: 'images/proyectos/microtienda.webp',
    github: 'https://github.com/Ramizzz8/microtienda',
    live: null,
    color: '#ff914d',
  },
]
