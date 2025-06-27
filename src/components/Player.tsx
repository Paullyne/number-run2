
import React from 'react';

interface PlayerProps {
  gameState: string;
  level: number;
}

const Player = ({ gameState, level }: PlayerProps) => {
  if (gameState === 'dead') {
    return (
      <div className="relative animate-bounce">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl animate-spin">
          💀
        </div>
      </div>
    );
  }

  // Calculate player evolution based on level
  const evolutionStage = Math.floor(level / 3);
  const hasAura = level > 2;
  const hasGlow = level > 5;
  const isMaster = level >= 8;

  return (
    <div className="relative group">
      {/* Aura effects based on intelligence level */}
      {hasAura && (
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
      )}
      {hasGlow && (
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-gold-500 rounded-full blur-md opacity-30 animate-ping"></div>
      )}
      {isMaster && (
        <div className="absolute -inset-6 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 rounded-full blur-lg opacity-20 animate-pulse"></div>
      )}

      {/* Character body with evolution */}
      <div className={`w-12 h-16 rounded-lg shadow-lg transform transition-all duration-500 group-hover:scale-110 ${
        isMaster 
          ? 'bg-gradient-to-b from-purple-600 to-purple-800 border-2 border-gold-400' 
          : hasGlow 
          ? 'bg-gradient-to-b from-blue-600 to-blue-800 border border-yellow-400' 
          : hasAura 
          ? 'bg-gradient-to-b from-blue-500 to-blue-700' 
          : 'bg-blue-500'
      }`}>
        {/* Head with intelligence indicators */}
        <div className={`w-8 h-8 rounded-full mx-auto -mt-2 border-2 transition-all duration-500 ${
          isMaster 
            ? 'bg-gradient-to-b from-gold-300 to-gold-400 border-gold-500' 
            : hasGlow 
            ? 'bg-gradient-to-b from-yellow-400 to-yellow-500 border-yellow-600' 
            : hasAura 
            ? 'bg-gradient-to-b from-yellow-300 to-yellow-400 border-yellow-500' 
            : 'bg-yellow-300 border-yellow-400'
        }`}>
          {/* Eyes that show intelligence */}
          <div className="flex justify-center pt-2 space-x-1">
            <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
              isMaster ? 'bg-purple-800 animate-pulse' : hasGlow ? 'bg-blue-800 animate-pulse' : 'bg-black'
            }`}></div>
            <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
              isMaster ? 'bg-purple-800 animate-pulse' : hasGlow ? 'bg-blue-800 animate-pulse' : 'bg-black'
            }`}></div>
          </div>
          
          {/* Wisdom symbol for advanced levels */}
          {isMaster && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs animate-bounce">
              🧙‍♂️
            </div>
          )}
          {hasGlow && !isMaster && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs animate-bounce">
              🎓
            </div>
          )}
          {hasAura && !hasGlow && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs animate-bounce">
              💡
            </div>
          )}
        </div>
        
        {/* Body details with evolution */}
        <div className={`w-6 h-2 mx-auto mt-1 rounded transition-all duration-500 ${
          isMaster 
            ? 'bg-gradient-to-r from-gold-400 to-gold-600' 
            : hasGlow 
            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' 
            : 'bg-red-500'
        }`}></div>
        
        {/* Arms with magical energy */}
        <div className={`absolute top-6 -left-2 w-2 h-6 rounded transform rotate-12 transition-all duration-500 ${
          isMaster 
            ? 'bg-gradient-to-b from-gold-400 to-gold-600' 
            : hasAura 
            ? 'bg-gradient-to-b from-yellow-400 to-yellow-600' 
            : 'bg-yellow-400'
        }`}></div>
        <div className={`absolute top-6 -right-2 w-2 h-6 rounded transform -rotate-12 transition-all duration-500 ${
          isMaster 
            ? 'bg-gradient-to-b from-gold-400 to-gold-600' 
            : hasAura 
            ? 'bg-gradient-to-b from-yellow-400 to-yellow-600' 
            : 'bg-yellow-400'
        }`}></div>

        {/* Magical staff for master level */}
        {isMaster && (
          <div className="absolute top-2 -right-6 w-1 h-12 bg-gradient-to-b from-brown-600 to-brown-800 rounded">
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      
      {/* Legs with evolution */}
      <div className="flex justify-center space-x-1 -mt-1">
        <div className={`w-2 h-6 rounded transition-all duration-500 ${
          isMaster 
            ? 'bg-gradient-to-b from-purple-700 to-purple-900' 
            : hasGlow 
            ? 'bg-gradient-to-b from-blue-700 to-blue-900' 
            : 'bg-blue-600'
        }`}></div>
        <div className={`w-2 h-6 rounded transition-all duration-500 ${
          isMaster 
            ? 'bg-gradient-to-b from-purple-700 to-purple-900' 
            : hasGlow 
            ? 'bg-gradient-to-b from-blue-700 to-blue-900' 
            : 'bg-blue-600'
        }`}></div>
      </div>
      
      {/* Enhanced shadow with magical energy */}
      <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-2 rounded-full transition-all duration-500 ${
        isMaster 
          ? 'bg-gradient-to-r from-purple-800 to-gold-800 opacity-40 animate-pulse' 
          : hasGlow 
          ? 'bg-gradient-to-r from-blue-800 to-yellow-800 opacity-30 animate-pulse' 
          : 'bg-black opacity-20 animate-pulse'
      }`}></div>

      {/* Level indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-bold text-gray-800 shadow-md">
        Nível {level}
      </div>
    </div>
  );
};

export default Player;
