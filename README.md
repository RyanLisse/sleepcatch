# sleepcatch

An AI-powered platform designed to summarize the latest news so you can catch up quickly on what you've missed while sleeping—developed as the capstone project for the Encode Club's 6-week AI bootcamp.

## 🔍 Overview

- 🧱 [Stack](#-stack)
- 🚀 [Getting Started](#-getting-started)
- 🌐 [Deploy](#-deploy)
- 📚 [Background](#-background)
- 💡 [Contributing](#-contributing)

## 🧱 Stack

- **App Framework**: [Next.js](https://nextjs.org/) - A React framework for building user interfaces with server-side rendering and generating static websites.
- **UI Components**:
  - [shadcn/ui](https://ui.shadcn.com/) - A component library to build fast and responsive interfaces.
  - [aceternity/ui](https://ui.aceternity.com/) - Provides sleek, modular UI components for rapid application development.
  - [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components for building high-quality design systems and web apps.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- **API Integration**:
  - [OpenAI](https://openai.com/) - Provides scalable generative models.
  - [NewsAPI](https://newsapi.org/) - Fetches live news articles from the web.
- **Animation Library**: [Framer Motion](https://www.framer.com/motion/) - A popular library for animations in React.
- **Database and ORM**:
  - [Turso](#) - Our SQL database for managing application data efficiently.
- **CLI Tools**: [Kirimase.dev](https://kirimase.dev/) - Enhances Next.js app development by integrating tools and scaffolding project resources quickly.

## 🚀 Getting Started

1. **Fork and Clone the Repository**
   Fork the repository to your GitHub account, then clone it locally:
   ```bash
   git clone git@github.com/ryanlise/sleepcatch.git
   cd sleepcatch
   ```
2. **Install Dependencies**
   ```bash
   bun install or npm install
   ```
3. **Setup Environment Variables**
   Copy the example environment file and fill it with your API keys:
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` to include your OpenAI and NewsAPI keys.
4. **Run the Application Locally**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` to see the application in action.

Key Directories:
src/app/: This directory contains the main application logic, including pages and layout components. It's central to the frontend logic of the application.
src/components/: This directory houses reusable UI components that can be used throughout the application, helping maintain consistency and reduce code duplication.
src/hooks/: Includes custom React hooks, such as useFetchArticles for fetching news articles, centralizing and reusing logic across components.
src/lib/: Contains utility functions and libraries, including authentication helpers, supporting the application's backend interactions and configurations.

sleepcatch/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── get_summary/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Griddy.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SidebarItems.tsx
│   │   └── ThemeProvider.tsx
│   ├── config/
│   │   └── nav.ts
│   ├── hooks/
│   │   └── useFetchArticles.ts
│   └── lib/
│       ├── db/
│       │   ├── migrations/
│       │   │   ├── 0000_silky_malice.sql
│       │   │   └── meta/
│       │   │       └── 0000_snapshot.json
│       │   └── migrate.ts
│       └── utils.ts
├── .gitignore
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json


## 🌐 Deploy

Deploy your version of Sleepcatch using Vercel:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ryanlisse/sleepcatch&env=OPENAI_API_KEY,NEWSAPI_API_KEY)

## 📚 Background

This project is the culmination of a comprehensive 6-week AI bootcamp by Encode Club, covering everything from the basics of machine learning and GPT models to advanced applications like fine-tuning and deploying AI-powered web applications.

### Curriculum Overview

- **Weeks 1-2**: Introduction to AI, building basic AI-driven apps.
- **Weeks 3-4**: Advanced model training, fine-tuning, and multi-modal AI applications.
- **Week 5**: Sponsor presentations and deep dives.
- **Week 6**: Project development and presentation.

## 💡 Contributing

We welcome contributions from the community. To contribute:

1. **Create a Fork**
   Start by forking the repository to your own GitHub account.

2. **Create a Branch**
   Create a new branch for your changes:
   ```bash
   git checkout -b your-branch-name
   ```
   It's best to use a descriptive name for your branch, such as `feature-add-login` or `bugfix-header-layout`.

3. **Make Changes and Commit**
   Make your changes locally and commit them to your branch:
   ```bash
   git add .
   git commit -m "Your detailed commit message"
   ```

4. **Push Changes**
   Push your changes to your fork on GitHub:
   ```bash
   git push origin your-branch-name
   ```

5. **Create a Pull Request**
   Go to the original repository and you'll see a prompt to open a pull request from your newly pushed branch. Follow the on-screen instructions to create a pull request.

