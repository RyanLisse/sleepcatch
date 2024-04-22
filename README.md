
# Sleepcatch

An AI-powered platform designed to summarize the latest news efficiently, allowing you to catch up quickly on significant developments that occurred while you were away. Developed during the Encode Club's intensive 6-week AI bootcamp, Sleepcatch represents a convergence of cutting-edge technologies and innovative design.

## 🔍 Table of Contents

- [Stack](#stack)
- [Getting Started](#getting-started)
- [Deploy](#deploy)
- [Background](#background)
- [Contributing](#contributing)

## 🧱 Stack

- **App Framework**: [Next.js](https://nextjs.org/) - A robust React framework that supports server-side rendering and static site generation.
- **UI Components**:
    - [Shadcn UI](https://ui.shadcn.com/) - For building fast, responsive interfaces.
    - [Aceternity UI](https://ui.aceternity.com/) - Offers sleek, modular UI components for rapid development.
    - [Radix UI](https://www.radix-ui.com/) - Provides unstyled, accessible components for constructing high-quality design systems.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework designed for quickly creating bespoke designs.
- **API Integration**:
    - [OpenAI](https://openai.com/) - Delivers scalable generative models.
    - [NewsAPI](https://newsapi.org/) - Fetches real-time news articles from various sources.
- **Animation Library**: [Framer Motion](https://www.framer.com/motion/) - Enables sophisticated animations in React applications.
- **Database and ORM**:
    - Turso - Manages application data effectively.[Learn more about Turso](https://turso.tech/)
    - **Drizzle ORM**: A headless TypeScript ORM . [Learn more about Drizzle](https://orm.drizzle.team/)

- **CLI Tools**: [Kirimase.dev](https://kirimase.dev/) - Streamlines development in Next.js by integrating essential tools and resources.

## 🚀 Getting Started

1. **Fork and Clone the Repository**
   Fork the repository to your GitHub account and clone it to your local machine:
   ```bash
   git clone git@github.com:yourgithubusername/sleepcatch.git
   cd sleepcatch
   ```
2. **Install Dependencies**
   ```bash
   bun install # or npm install
   ```
3. **Setup Environment Variables**
   Duplicate the example environment file and enter your API keys:
   ```bash
   cp .env.local.example .env.local
   ```
   Modify `.env.local` to include your OpenAI and NewsAPI keys.

4. **Run the Application Locally**
   ```bash
   npm run dev
   ```

## Access the Application

Navigate to the application using the following URL:
`http://localhost:3000`

## Key Directories

- **src/app/**:
    - This directory contains the main application logic, including pages and layout components.
    - It's central to the frontend logic of the application.

- **src/components/**:
    - This directory houses reusable UI components that can be used throughout the application.
    - Helps maintain consistency and reduce code duplication.


- **src/lib/**:
    - Contains utility functions and libraries, such as authentication helpers.
    - Supports the application's backend interactions and configurations.


## 📡 API Flow

![mermaid-flow](https://github.com/RyanLisse/sleepcatch/assets/57917217/06eca4fa-f849-4750-870f-e03c35e72790)

## 🌐 Deploy

Deploy your version of Sleepcatch effortlessly using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourgithubusername/sleepcatch&env=OPENAI_API_KEY,NEWSAPI_API_KEY)

## 📚 Background

Sleepcatch is the result of a comprehensive 6-week AI bootcamp by Encode Club, which covered the essentials of machine learning and GPT models to more complex topics like fine-tuning and deploying AI technologies.

### Curriculum Highlights

- **Weeks 1-2**: Foundations of AI, building simple AI-driven applications.
- **Weeks 3-4**: Advanced model training, fine-tuning, and exploring multi-modal AI uses.
- **Week 5**: Sponsor presentations and in-depth technical sessions.
- **Week 6**: Project development and final presentations.

## 💡 Contributing

Contributions are welcomed! To get involved:

1. **Create a Fork**
   Begin by forking the repository to your GitHub account.

2. **Create a Branch**
   ```bash
   git checkout -b your-branch-name
   ```
   Use a descriptive name for your branch, like `feature-add-login` or `bugfix-header-layout`.

3. **Make Changes and Commit**
   Implement your changes locally and commit them:
   ```bash
   git add .
   git commit -m "Detailed commit message describing the change"
   ```

4. **Push Changes**
   ```bash
   git push origin your-branch-name
   
   ```

5. **Create a Pull Request**
   Visit the original repository, and you should see a prompt to create a pull request from your branch. Complete the pull request with your changes.
