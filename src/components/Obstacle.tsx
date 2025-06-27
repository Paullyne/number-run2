
import React from 'react';

interface ObstacleProps {
  type: number;
  isActive: boolean;
  isPassed: boolean;
  isDestroying?: boolean;
}

const Obstacle = ({ type, isActive, isPassed, isDestroying }: ObstacleProps) => {
  if (isPassed) {
    return (
      <div className="w-16 h-16 flex items-center justify-center relative">
        {/* Destruction particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-bounce opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
        <div className="text-4xl animate-pulse">✨</div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-600 bg-white bg-opacity-80 px-2 py-1 rounded">
          Superado!
        </div>
      </div>
    );
  }

  if (isDestroying) {
    return (
      <div className="w-16 h-16 flex items-center justify-center relative animate-pulse">
        {/* Destruction effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg blur-sm animate-ping opacity-75"></div>
        {/* Cracks and breaking effects */}
        <div className="relative">
          {obstacles[type]}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 mix-blend-multiply opacity-80 animate-pulse rounded"></div>
          {/* Breaking particles */}
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  const obstacles = [
    // Gate
    <div className="w-12 h-20 bg-gradient-to-b from-stone-600 to-stone-800 rounded-t-lg border-2 border-stone-700 relative shadow-lg">
      <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
      <div className="absolute top-6 left-1 w-4 h-1 bg-stone-500"></div>
      <div className="absolute top-10 left-1 w-4 h-1 bg-stone-500"></div>
      <div className="text-center mt-12 text-xs">🚪</div>
      {isActive && <div className="absolute inset-0 bg-red-500 opacity-30 rounded-t-lg animate-pulse"></div>}
    </div>,
    
    // Monster
    <div className="w-14 h-16 bg-gradient-to-b from-purple-600 to-purple-800 rounded-lg relative shadow-lg border-2 border-purple-700">
      <div className="w-10 h-10 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full mx-auto mt-1 border border-purple-800">
        <div className="flex justify-center pt-2 space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <div className="w-4 h-1 bg-white mx-auto mt-1 rounded"></div>
      </div>
      <div className="text-center text-2xl animate-bounce">👹</div>
      {isActive && <div className="absolute inset-0 bg-red-500 opacity-30 rounded-lg animate-pulse"></div>}
    </div>,
    
    // Bridge
    <div className="w-16 h-12 relative shadow-lg">
      <div className="w-full h-4 bg-gradient-to-b from-amber-600 to-amber-800 rounded border-2 border-amber-700 mt-4"></div>
      <div className="absolute left-0 top-0 w-2 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded border border-amber-800"></div>
      <div className="absolute right-0 top-0 w-2 h-8 bg-gradient-to-b from-amber-700 to-amber-900 rounded border border-amber-800"></div>
      <div className="text-center text-xs mt-1">🌉</div>
      {isActive && <div className="absolute inset-0 bg-red-500 opacity-30 rounded animate-pulse"></div>}
    </div>
  ];

  return (
    <div className={`transition-all duration-300 relative ${
      isActive ? 'animate-bounce scale-110 drop-shadow-lg' : ''
    }`}>
      {obstacles[type]}
      
      {isActive && (
        <>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full animate-bounce shadow-lg">
            ❗ Desafio!
          </div>
          {/* Danger aura */}
          <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg blur-sm opacity-30 animate-pulse"></div>
        </>
      )}

      {/* Challenge difficulty indicator */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full ${
              i < (type + 1) ? 'bg-red-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Obstacle;
