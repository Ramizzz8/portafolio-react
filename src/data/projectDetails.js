// Información ampliada de los proyectos destacados, mostrada en la ventana de detalle.
// Las claves coinciden con el `id` de featuredProjects (src/data/projects.js).
// Cada idioma tiene: resumen (párrafos), funciones (lista) y tecnico (lista).
// `galeria` son imágenes extra además de la portada.

export const projectDetails = {
  1: {
    galeria: [],
    es: {
      resumen: [
        'Plataforma web desarrollada para Novacapital SAS, una empresa de créditos por libranza dirigidos a pensionados y empleados públicos. Digitaliza todo el ciclo de originación del crédito: desde que el cliente simula su cuota hasta que el préstamo se aprueba y se hace seguimiento.',
        'La aplicación tiene tres tipos de usuario con su propio panel: el cliente, que solicita y consulta sus créditos; el asesor, que acompaña a sus clientes asignados; y el administrador, que gestiona toda la operación.',
      ],
      funciones: [
        'Simulador de cuotas en la página de inicio',
        'Registro de clientes y solicitud de préstamo en 4 pasos: datos personales, laborales, del préstamo y documentos',
        'Paneles independientes para cliente, asesor y administrador',
        'Panel de administración con indicadores, clientes, solicitudes, préstamos y asesores',
        'Asignación de asesores a clientes y notificaciones internas',
        'Cambio de estado de cada solicitud: solicitado, en revisión, aprobado…',
        'Reportes con exportación a CSV de clientes, préstamos y cartera',
        'Recuperación de contraseña con enlace temporal',
      ],
      tecnico: [
        'Contraseñas cifradas con bcrypt y control de acceso por rol mediante decoradores de Flask',
        'Consultas parametrizadas a MySQL para evitar la inyección SQL',
        'Subida de documentos con validación de extensión, servidos solo a través de rutas autenticadas',
        'Registro de auditoría en formato JSONL (inicios de sesión, acciones de administración y préstamos) consultable desde el panel',
        'Configuración separada del código mediante variables de entorno',
      ],
    },
    en: {
      resumen: [
        'Web platform built for Novacapital SAS, a company that offers payroll-deduction loans to retirees and public employees. It digitalises the whole loan origination cycle: from the moment the client simulates their payment until the loan is approved and followed up.',
        'The app has three user types, each with its own panel: the client, who applies for and checks their loans; the advisor, who supports their assigned clients; and the administrator, who manages the whole operation.',
      ],
      funciones: [
        'Payment simulator on the home page',
        'Client sign-up and a 4-step loan application: personal, employment, loan and document details',
        'Separate panels for clients, advisors and administrators',
        'Admin panel with KPIs, clients, applications, loans and advisors',
        'Advisor assignment and internal notifications',
        'Status changes for each application: requested, under review, approved…',
        'Reports with CSV export of clients, loans and portfolio',
        'Password recovery with a time-limited link',
      ],
      tecnico: [
        'Passwords hashed with bcrypt and role-based access control with Flask decorators',
        'Parameterised MySQL queries to prevent SQL injection',
        'Document uploads with extension validation, served only through authenticated routes',
        'JSONL audit log (logins, admin actions and loans) viewable from the admin panel',
        'Configuration kept out of the code through environment variables',
      ],
    },
  },

  2: {
    galeria: [],
    es: {
      resumen: [
        'Plataforma web para Moves Location, una empresa de gestiones migratorias en España. Centraliza la relación con cada cliente: el cliente se registra, sube su documentación y sigue el estado de su trámite, mientras el equipo gestiona los casos desde un panel interno.',
        'Cada cliente tiene asignado un asesor con el que puede comunicarse desde la propia plataforma, y toda su documentación queda en un único sitio.',
      ],
      funciones: [
        'Registro e inicio de sesión de clientes',
        'Panel del cliente con el estado de su trámite y sus documentos',
        'Subida de documentos con validación de formato',
        'Panel de administración: alta de asesores y asignación de un asesor a cada cliente',
        'Cambio de estado de cada trámite y de cada documento',
        'Mensajería interna entre el cliente y su asesor',
        'Formulario de contacto que envía un correo al equipo',
      ],
      tecnico: [
        'Flask con SQLAlchemy (ORM) sobre MySQL, y SQLite para desarrollo local',
        'Modelos relacionados de usuarios, asesores y mensajes con claves ajenas',
        'Envío de correos con Flask-Mail y configuración por variables de entorno (.env)',
        'Batería de 21 tests automáticos con pytest: autenticación, modelos, administración, subidas y validaciones',
        'Preparado para producción con Gunicorn',
      ],
    },
    en: {
      resumen: [
        'Web platform for Moves Location, an immigration services company in Spain. It centralises the relationship with each client: the client signs up, uploads their documents and follows the status of their case, while the team manages cases from an internal panel.',
        'Each client has an assigned advisor they can talk to from within the platform, and all their documents are kept in one place.',
      ],
      funciones: [
        'Client sign-up and login',
        'Client panel with the status of their case and documents',
        'Document uploads with format validation',
        'Admin panel: create advisors and assign one to each client',
        'Status changes for each case and each document',
        'Internal messaging between the client and their advisor',
        'Contact form that emails the team',
      ],
      tecnico: [
        'Flask with SQLAlchemy (ORM) on MySQL, and SQLite for local development',
        'Related models for users, advisors and messages with foreign keys',
        'Emails sent with Flask-Mail and configuration through environment variables (.env)',
        'Suite of 21 automated tests with pytest: authentication, models, admin, uploads and validation',
        'Production-ready with Gunicorn',
      ],
    },
  },

  3: {
    galeria: ['images/proyectos/camaron-ficha.webp', 'images/proyectos/camaron-panel.webp'],
    es: {
      resumen: [
        'Portal inmobiliario completo con una parte pública para buscar vivienda y un panel privado para que los agentes gestionen el catálogo.',
        'Partió de un ejercicio con un buscador sencillo y lo convertí en una aplicación con fichas, galerías, panel de administración y una capa de seguridad pensada para producción.',
      ],
      funciones: [
        'Buscador por localidad, tipo de vivienda, rango de precio y número de habitaciones',
        'Ordenación por precio, superficie o novedad, con los filtros en la URL para poder compartir la búsqueda',
        'Ficha de cada vivienda con galería, precio por m² y características',
        'Panel de agentes con estadísticas: viviendas publicadas, precio medio y localidades',
        'Alta, edición y borrado de viviendas con validación en el servidor',
        'Subida de varias fotos por vivienda',
      ],
      tecnico: [
        'Todas las consultas con sentencias preparadas de PDO',
        'Login contra la base de datos con password_hash / password_verify y regeneración del ID de sesión',
        'Token CSRF en todos los formularios del panel',
        'Validación del tipo real de cada imagen subida y nombre de archivo aleatorio',
        'Base de datos relacional con ON DELETE CASCADE y un usuario MySQL con permisos mínimos',
      ],
    },
    en: {
      resumen: [
        'Complete real estate portal with a public side to search for homes and a private panel where agents manage the catalogue.',
        'It started as an exercise with a simple search form, and I turned it into an app with detail pages, galleries, an admin panel and a production-minded security layer.',
      ],
      funciones: [
        'Search by town, property type, price range and number of bedrooms',
        'Sorting by price, size or newest, with filters in the URL so searches can be shared',
        'Detail page for each property with gallery, price per m² and features',
        'Agent panel with stats: published listings, average price and towns',
        'Create, edit and delete listings with server-side validation',
        'Multiple photo uploads per listing',
      ],
      tecnico: [
        'Every query uses PDO prepared statements',
        'Database login with password_hash / password_verify and session ID regeneration',
        'CSRF token on every admin form',
        'Real file-type check for each uploaded image and random file names',
        'Relational database with ON DELETE CASCADE and a least-privilege MySQL user',
      ],
    },
  },

  4: {
    // Sin demo en vivo (el modelo de IA necesita más memoria de la que tiene el servidor):
    // se muestra un vídeo grabado con las tres herramientas funcionando en local
    video: 'videos/laboratorio-ia.mp4',
    poster: 'videos/laboratorio-ia.webp',
    galeria: ['images/proyectos/laboratorio-ia-chat.webp', 'images/proyectos/laboratorio-ia-saneador.webp'],
    es: {
      resumen: [
        'Aplicación con tres herramientas de inteligencia artificial que se ejecutan por completo en el propio equipo: ningún dato sale a servicios externos.',
        'Combina un modelo de lenguaje local servido con Ollama y una base de datos vectorial para buscar información por significado y responder con fuentes (RAG).',
      ],
      funciones: [
        'Chat con un modelo de lenguaje local con respuestas en streaming y memoria de la conversación',
        'Buscador semántico sobre una colección de apuntes: encuentra resultados por significado, no por palabras exactas',
        'Respuestas generadas a partir de los resultados, citando las fuentes [1], [2]…',
        'Saneador de transcripciones: añade puntuación, separa párrafos y resalta las ideas clave',
      ],
      tecnico: [
        'Fragmentado de documentos con solapamiento, cortando en finales de frase',
        'Embeddings multilingües con sentence-transformers guardados en ChromaDB y búsqueda por similitud coseno',
        'Streaming de la respuesta del modelo de Flask al navegador con la Fetch API',
        'Renderizado de Markdown propio y seguro: se escapa todo el texto antes de aplicar formato',
      ],
    },
    en: {
      resumen: [
        'App with three artificial intelligence tools that run entirely on your own machine: no data is sent to external services.',
        'It combines a local language model served with Ollama and a vector database to search information by meaning and answer with sources (RAG).',
      ],
      funciones: [
        'Chat with a local language model, with streaming answers and conversation memory',
        'Semantic search over a collection of notes: finds results by meaning, not exact words',
        'Answers generated from the results, citing the sources [1], [2]…',
        'Transcript cleaner: adds punctuation, splits paragraphs and highlights key ideas',
      ],
      tecnico: [
        'Document chunking with overlap, cutting at sentence ends',
        'Multilingual embeddings with sentence-transformers stored in ChromaDB and cosine-similarity search',
        "Streaming of the model's answer from Flask to the browser with the Fetch API",
        'Custom, safe Markdown rendering: all text is escaped before formatting is applied',
      ],
    },
  },

  10: {
    galeria: [],
    es: {
      resumen: [
        'Proyecto del módulo de Desarrollo web en entorno servidor (DAW). Parte de un ejemplo de clase que dibujaba los 768 valores de un embedding como puntos en un círculo; lo transformé en una visualización que responde a la pregunta que de verdad interesa: ¿de qué se está hablando?',
        'Cada tema se define con una lista de palabras clave. Lo que dices se convierte en un vector y se compara con los vectores de cada tema; la aguja apunta hacia el más parecido y los sectores crecen según el peso de cada uno.',
        'La versión original funciona con PHP y Ollama en local. Para la demo pública, el mismo modelo multilingüe se ejecuta en el navegador con Transformers.js, así que no hace falta servidor y nada de lo que dices sale del equipo.',
      ],
      funciones: [
        'Dictado por voz en tiempo real o entrada escrita',
        'Brújula que apunta al tema dominante, con la estela de las últimas frases',
        'Gráfica temporal que marca los cambios de tema y la palabra donde ocurrieron',
        'Temas editables: añade los tuyos con sus palabras clave',
        'Ajustes para analizar 1, 5 o 10 palabras y para afinar la sensibilidad',
      ],
      tecnico: [
        'Similitud coseno entre embeddings y softmax con temperatura para repartir el peso entre los temas',
        'Cada tema combina la palabra clave más parecida con el centroide de todas, más robusto que un único vector',
        'Detección de cambio de tema comparando cada consulta con la media de las cinco anteriores',
        'Dibujo en Canvas con animación suavizada y soporte de pantallas de alta densidad',
        'Versión servidor: PHP con cURL que pide los embeddings a Ollama en lote y devuelve errores en JSON',
        'Diagnóstico de un fallo real: nomic-embed-text, entrenado en inglés, confundía «hamburguesa» con viajes; se resolvió con un modelo multilingüe',
      ],
    },
    en: {
      resumen: [
        'Project for the Server-side Web Development module (DAW). It starts from a class example that drew the 768 values of an embedding as dots in a circle; I turned it into a visualisation that answers the question that actually matters: what is being talked about?',
        'Each topic is defined by a list of keywords. What you say is turned into a vector and compared with the vectors of each topic; the needle points to the closest one and the sectors grow with the weight of each.',
        'The original version runs on PHP and Ollama locally. For the public demo, the same multilingual model runs in the browser with Transformers.js, so no server is needed and nothing you say leaves your device.',
      ],
      funciones: [
        'Real-time voice dictation or typed input',
        'Compass that points to the dominant topic, with a trail of the latest phrases',
        'Timeline chart that marks topic changes and the word where they happened',
        'Editable topics: add your own with their keywords',
        'Settings to analyse 1, 5 or 10 words and tune the sensitivity',
      ],
      tecnico: [
        'Cosine similarity between embeddings and a temperature softmax to share the weight among topics',
        'Each topic mixes its closest keyword with the centroid of all of them, sturdier than a single vector',
        'Topic-change detection by comparing each query with the average of the previous five',
        'Canvas drawing with smoothed animation and high-density screen support',
        'Server version: PHP with cURL that requests embeddings from Ollama in batches and returns errors as JSON',
        "Real bug diagnosis: nomic-embed-text, trained in English, mistook «hamburguesa» (burger) for travel; fixed with a multilingual model",
      ],
    },
  },
}
