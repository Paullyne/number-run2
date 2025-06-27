
import React from 'react';

interface PlayerProps {
  gameState: string;
}

const Player = ({ gameState }: PlayerProps) => {
  if (gameState === 'dead') {
    return (
      <div className="relative animate-bounce">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl animate-spin">
          💀
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Character body */}
      <div className="w-12 h-16 bg-blue-500 rounded-lg shadow-lg transform transition-transform group-hover:scale-110">
        {/* Head */}
        <div className="w-8 h-8 bg-yellow-300 rounded-full mx-auto -mt-2 border-2 border-yellow-400">
          {/* Eyes */}
          <div className="flex justify-center pt-2 space-x-1">
            <div className="w-1 h-1 bg-black rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-black rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Body details */}
        <div className="w-6 h-2 bg-red-500 mx-auto mt-1 rounded"></div>
        
        {/* Arms */}
        <div className="absolute top-6 -left-2 w-2 h-6 bg-yellow-400 rounded transform rotate-12"></div>
        <div className="absolute top-6 -right-2 w-2 h-6 bg-yellow-400 rounded transform -rotate-12"></div>
      </div>
      
      {/* Legs */}
      <div className="flex justify-center space-x-1 -mt-1">
        <div className="w-2 h-6 bg-blue-600 rounded"></div>
        <div className="w-2 h-6 bg-blue-600 rounded"></div>
      </div>
      
      {/* Walking animation shadow */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-black opacity-20 rounded-full animate-pulse"></div>
    </div>
  );
};

export default Player;
