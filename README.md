# DevStarter Wars 🚀

Una app para desarrolladores jóvenes que necesitan motivación falsa para codear proyectos absurdos.

## 🎯 Características

- **Generador de Ideas Inútiles**: Recibe ideas absurdas generadas por Groq AI (Llama 3)
- **Vault Personal**: Guarda tus ideas favoritas para fingir que las harás algún día
- **Commit Wars**: Muro social con los commits más absurdos de la comunidad
- **Diseño Dark**: Interfaz moderna y adictiva con tema oscuro
- **100% Gratuito**: Usa Groq AI que es completamente gratis

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Base de datos y autenticación)
- **Groq AI** (Generación de ideas con Llama 3)
- **Framer Motion** (Animaciones)

## 🚀 Instalación

1. Clona el repositorio:
\`\`\`bash
git clone <tu-repo>
cd devstarter-wars
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configura las variables de entorno:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Configura Supabase:
   - Crea un proyecto en [supabase.com](https://supabase.com)
   - Ejecuta los scripts SQL en \`scripts/\`
   - Configura GitHub OAuth

5. Configura Groq AI (GRATIS):
   - Ve a [console.groq.com](https://console.groq.com)
   - Regístrate gratis
   - Crea una API key
   - Agrégala a tu \`.env.local\`

6. Ejecuta el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🤖 ¿Por qué Groq?

- ✅ **100% GRATUITO** - Sin tarjeta de crédito
- ✅ **Súper rápido** - Más rápido que OpenAI
- ✅ **Modelos potentes** - Llama 3 de Meta
- ✅ **Sin límites estrictos** - Perfecto para desarrollo

## 📁 Estructura del Proyecto

\`\`\`
devstarter-wars/
├── app/
│   ├── layout.tsx          # Layout global con Navbar
│   ├── page.tsx            # Home page con generador
│   ├── vault/page.tsx      # Página del vault
│   ├── commitwars/page.tsx # Muro de commits
│   └── api/                # API routes
│       ├── generate-idea/route.ts # Generación de ideas con Groq
│       └── test-groq/route.ts     # Test de conexión con Groq
├── components/
│   ├── Navbar.tsx          # Barra de navegación
│   ├── IdeaCard.tsx        # Tarjeta de idea
│   └── CommitCard.tsx      # Tarjeta de commit
├── lib/
│   ├── supabase.ts         # Configuración de Supabase
│   └── groq.ts             # Configuración de Groq AI
├── hooks/
│   ├── useAuth.ts          # Hook de autenticación
│   ├── useIdeas.ts         # Hook para ideas
│   └── useCommits.ts       # Hook para commits
└── scripts/
    └── *.sql               # Scripts de base de datos
\`\`\`

## 🔮 Features

- [x] Generación de ideas con Groq AI
- [x] Autenticación con GitHub
- [x] Guardado de ideas en Supabase
- [x] Sistema de reacciones en commits
- [x] Animaciones con Framer Motion
- [x] Protección de rutas
- [x] Diseño responsive

## 📝 Licencia

MIT License - Haz lo que quieras con este código absurdo.
