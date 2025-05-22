
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8" aria-label="Loading...">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-500"></div>
    </div>
  );
};

export default Loader;
