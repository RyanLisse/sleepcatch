
# sleepcatch

An AI-powered platform designed to summarize the latest news so you can catch up quickly on what you've missed while sleeping—developed as the capstone project for the Encode Club's 6-week AI bootcamp.

## 🔍 Overview

- 🧱 [Stack](#-stack)
- 🚀 [Quickstart](#-quickstart)
- 🌐 [Deploy](#-deploy)
- 📚 [Background](#-background)

## 🧱 Stack

- **App framework**: [Next.js](https://nextjs.org/) - A React framework for building user interfaces with server-side rendering and generating static websites.
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
- **CLI Tools**:
  - [Kirimase.dev](https://kirimase.dev/) - Enhances Next.js app development by integrating tools and scaffolding project resources quickly.

## 🚀 Quickstart

### 1. Fork and Clone the Repo

Fork the repository to your GitHub account, then clone it locally:

```bash
git clone git@github.com:[YOUR_GITHUB_ACCOUNT]/sleepcatch.git
cd sleepcatch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment file and fill it with your API keys:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` to include your OpenAI and NewsAPI keys.

### 4. Run the Application Locally

```bash
npm run dev
```

Navigate to `http://localhost:3000` to see the application in action.

## 🌐 Deploy

Deploy your version of Sleepcatch using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/[YOUR_GITHUB_ACCOUNT]/sleepcatch&env=OPENAI_API_KEY,NEWSAPI_API_KEY)

## 📚 Background

This project is the culmination of a comprehensive 6-week AI bootcamp by Encode Club, covering everything from the basics of machine learning and GPT models to advanced applications like fine-tuning and deploying AI-powered web applications.

### Curriculum Overview

- **Weeks 1-2**: Introduction to AI, building basic AI-driven apps.
- **Weeks 3-4**: Advanced model training, fine-tuning, and multi-modal AI applications.
- **Week 5**: Sponsor presentations and deep dives.
- **Week 6**: Project development and presentation.
