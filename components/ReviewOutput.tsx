
import React from 'react';

interface ReviewOutputProps {
  feedback: string | null;
}

const ReviewOutput: React.FC<ReviewOutputProps> = ({ feedback }) => {
  if (!feedback) return null;

  // Basic formatting for newlines and potential markdown-like list items
  const formattedFeedback = feedback
    .split('\n')
    .map((line, index) => {
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc">{line.substring(line.indexOf(' ') + 1)}</li>;
      }
      if (line.toLowerCase().includes("overall assessment:") || line.toLowerCase().includes("specific suggestions:")) {
        return <p key={index} className="mt-3 mb-1 font-semibold text-sky-400">{line}</p>;
      }
      return <p key={index}>{line || <br />}</p>; // Render <br /> for empty lines to maintain spacing
    });


  return (
    <div className="mt-8 p-6 bg-slate-800 border border-slate-700 rounded-md shadow-lg">
      <h3 className="text-xl font-semibold text-sky-400 mb-4">Review Feedback:</h3>
      <div className="prose prose-sm prose-invert max-w-none text-slate-200 whitespace-pre-wrap break-words">
        {formattedFeedback.map((item, index) => {
          if (React.isValidElement(item) && item.type === 'li') {
            // Wrap list items in a <ul> if not already part of one (simple heuristic)
            if (index === 0 || !React.isValidElement(formattedFeedback[index-1]) || (React.isValidElement(formattedFeedback[index-1]) && (formattedFeedback[index-1] as React.ReactElement).type !== 'li')) {
              // Start of a list
              const listItems = [];
              for (let j = index; j < formattedFeedback.length; j++) {
                if (React.isValidElement(formattedFeedback[j]) && (formattedFeedback[j] as React.ReactElement).type === 'li') {
                  listItems.push(formattedFeedback[j]);
                } else {
                  break;
                }
              }
              return <ul key={`ul-${index}`} className="list-disc pl-5 space-y-1 my-2">{listItems}</ul>;
            }
            // If already handled by a <ul> wrapper, skip
            if (index > 0 && React.isValidElement(formattedFeedback[index-1]) && (formattedFeedback[index-1] as React.ReactElement).type === 'li') {
                // This item is part of a list already started, it will be rendered by the ul logic
                return null; 
            }
          }
          return item; // Render paragraphs and other elements directly
        }).filter(item => item !== null)}
      </div>
    </div>
  );
};

export default ReviewOutput;
