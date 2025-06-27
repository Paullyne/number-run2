
import React from 'react';

interface ObstacleProps {
  type: number;
  isActive: boolean;
  isPassed: boolean;
}

const Obstacle = ({ type, isActive, isPassed }: ObstacleProps) => {
  if (isPassed) {
    return (
      <div className="w-16 h-16 flex items-center justify-center animate-pulse">
        <div className="text-4xl">✨</div>
      </div>
    );
  }

  const obstacles = [
    // Gate
    <div className="w-12 h-20 bg-gradient-to-b from-brown-600 to-brown-800 rounded-t-lg border-2 border-brown-700 relative">
      <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-500 rounded-full"></div>
      <div className="absolute top-6 left-1 w-4 h-1 bg-brown-500"></div>
      <div className="absolute top-10 left-1 w-4 h-1 bg-brown-500"></div>
      <div className="text-center mt-12 text-xs">🚪</div>
    </div>,
    
    // Monster
    <div className="w-14 h-16 bg-purple-600 rounded-lg relative animate-bounce">
      <div className="w-10 h-10 bg-purple-500 rounded-full mx-auto mt-1">
        <div className="flex justify-center pt-2 space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <div className="w-4 h-1 bg-white mx-auto mt-1 rounded"></div>
      </div>
      <div className="text-center text-2xl">👹</div>
    </div>,
    
    // Bridge
    <div className="w-16 h-12 relative">
      <div className="w-full h-4 bg-brown-500 rounded border-2 border-brown-600 mt-4"></div>
      <div className="absolute left-0 top-0 w-2 h-8 bg-brown-700 rounded"></div>
      <div className="absolute right-0 top-0 w-2 h-8 bg-brown-700 rounded"></div>
      <div className="text-center text-xs mt-1">🌉</div>
    </div>
  ];

  return (
    <div className={`transition-all duration-300 ${isActive ? 'animate-pulse scale-110' : ''}`}>
      {obstacles[type]}
      {isActive && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-xs px-2 py-1 rounded-full animate-bounce">
          ❗
        </div>
      )}
    </div>
  );
};

export default Obstacle;
