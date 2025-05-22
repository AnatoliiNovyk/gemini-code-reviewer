
import React, { useState, useCallback } from 'react';
import CodeInput from './components/CodeInput';
import ReviewOutput from './components/ReviewOutput';
import Loader from './components/Loader';
import ErrorDisplay from './components/ErrorDisplay';
import { reviewCodeWithGemini } from './services/geminiService';
import { ReviewStatus } from './types';

const App: React.FC = () => {
  const [reviewFeedback, setReviewFeedback] = useState<string | null>(null);
  const [status, setStatus] = useState<ReviewStatus>(ReviewStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleCodeSubmit = useCallback(async (code: string) => {
    setStatus(ReviewStatus.LOADING);
    setError(null);
    setReviewFeedback(null);

    try {
      const feedback = await reviewCodeWithGemini(code);
      setReviewFeedback(feedback);
      setStatus(ReviewStatus.SUCCESS);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      setStatus(ReviewStatus.ERROR);
      console.error("Submission error:", err);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-sky-400 sm:text-5xl">
          <span className="inline-block transform hover:scale-105 transition-transform duration-300">🤖</span> Gemini Code Reviewer
        </h1>
        <p className="mt-3 text-lg text-slate-300 max-w-2xl mx-auto">
          Submit your code snippets and get instant, AI-powered feedback on quality, bugs, and best practices.
        </p>
      </header>

      <main className="max-w-4xl mx-auto bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700">
        <CodeInput onSubmit={handleCodeSubmit} isLoading={status === ReviewStatus.LOADING} />

        {status === ReviewStatus.LOADING && <Loader />}
        {status === ReviewStatus.ERROR && error && <ErrorDisplay message={error} />}
        
        {status === ReviewStatus.SUCCESS && reviewFeedback && (
          <ReviewOutput feedback={reviewFeedback} />
        )}
        
        {status === ReviewStatus.IDLE && !reviewFeedback && (
           <div className="mt-8 p-6 bg-slate-800 border border-slate-700 rounded-md shadow-lg text-center">
            <p className="text-slate-400">
              Your code review feedback will appear here.
            </p>
          </div>
        )}
      </main>

      <footer className="text-center mt-12 py-6 border-t border-slate-700">
        <p className="text-sm text-slate-500">
          Powered by Anatolii SunFixer & Google Gemini. For educational and illustrative purposes.
        </p>
         <p className="text-xs text-slate-600 mt-1">
          Always manually verify critical code reviews.
        </p>
      </footer>
    </div>
  );
};

export default App;
