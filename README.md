# Resume Checker AI

An intelligent tool designed to help job seekers optimize their resumes. This application analyzes your CV against a specific Job Description (JD) to provide actionable feedback, an ATS compatibility score, and personalized recommendations.

![Resume Checker AI Screenshot](public/screenshot.png)

## 🚀 Features

- **Dual Input Methods**: Paste your CV text directly or upload a PDF file.
- **Job Description Analysis**: Compare your resume against a specific job description to ensure alignment.
- **Detailed Feedback**:
  - **ATS Score**: Get a score representing how well your resume matches the job.
  - **Strengths & Weaknesses**: Identify what you're doing right and where you can improve.
  - **Keyword Analysis**: See which keywords from the JD are missing in your resume.
  - **Tailored Recommendations**: Specific suggestions to close gaps.
- **Multi-language Support**: Currently supports English and German.
- **Modern UI**: Built with a clean, responsive design supporting both Light and Dark modes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PDF Processing**: `pdf-parse`

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd resume-checker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 Usage

1. **Enter your CV**: Paste your resume text into the left panel or click "Upload PDF" to select a file.
2. **Enter Job Description**: Paste the job description you are applying for into the right panel.
3. **Select Language**: Choose between English (US flag) or German (DE flag) using the toggle in the header.
4. **Analyze**: Click the "Analyze Resume" button.
5. **Review Results**: Scroll down to see your ATS score, missing keywords, and specific advice on how to improve your resume.

## ⚠️ Note on AI Integration

Currently, the analysis backend (`src/app/api/analyze/route.ts`) returns **mocked data** for demonstration purposes. To make this fully functional, you will need to integrate a real LLM API (like OpenAI GPT-4 or Google Gemini) in the backend route.

## 📂 Project Structure

- `src/app`: Main application code (Next.js App Router).
- `src/components`: Reusable UI components (e.g., AnalysisResult).
- `src/lib`: Utility functions and translations.
- `public`: Static assets.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
