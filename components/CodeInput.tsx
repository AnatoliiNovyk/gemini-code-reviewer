
import React, { useState } from 'react';
import { DEFAULT_CODE_EXAMPLE } from '../constants';

interface CodeInputProps {
  onSubmit: (code: string) => void;
  isLoading: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({ onSubmit, isLoading }) => {
  const [code, setCode] = useState<string>(DEFAULT_CODE_EXAMPLE);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (code.trim()) {
      onSubmit(code);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="codeInput" className="block text-sm font-medium text-sky-300 mb-1">
          Paste your code here:
        </label>
        <textarea
          id="codeInput"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code to review..."
          rows={15}
          className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 text-slate-50 text-sm font-mono resize-y"
          disabled={isLoading}
        />
        <p className="mt-1 text-xs text-slate-400">Enter the code snippet you want to get reviewed.</p>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setCode('')}
          disabled={isLoading || !code}
          className="px-6 py-2.5 border border-slate-600 text-slate-300 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={isLoading || !code.trim()}
          className="px-6 py-2.5 bg-sky-600 text-white font-semibold rounded-md shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Reviewing...' : 'Get Review'}
        </button>
      </div>
    </form>
  );
};

export default CodeInput;
