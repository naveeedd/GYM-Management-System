import React from 'react';
import { Dumbbell } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-bounce mb-4">
          <Dumbbell className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Loading FlexFit...</h2>
      </div>
    </div>
  );
};

export default LoadingScreen;