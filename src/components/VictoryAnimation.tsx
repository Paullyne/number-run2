
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface VictoryAnimationProps {
  onRestart: () => void;
}

const VictoryAnimation = ({ onRestart }: VictoryAnimationProps) => {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    setShowFireworks(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-green-500 flex items-center justify-center overflow-hidden">
      {/* Fireworks */}
      {showFireworks && (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '1.5s'
              }}
            >
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
          ))}
          
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`star-${i}`}
              className="absolute animate-bounce text-4xl"
              style={{
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 90 + 5}%`,
                animationDelay: `${Math.random() * 1.5}s`
              }}
            >
              ✨
            </div>
          ))}
        </>
      )}

      {/* Victory content */}
      <div className="text-center text-white z-10 animate-fade-in bg-black bg-opacity-30 rounded-3xl p-8 backdrop-blur-sm">
        <div className="text-8xl mb-4 animate-bounce">🏆</div>
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
          PARABÉNS!
        </h1>
        <h2 className="text-3xl font-semibold mb-4">
          Você venceu o desafio matemático!
        </h2>
        <p className="text-xl mb-8 opacity-90">
          🎉 Todas as 10 perguntas foram respondidas corretamente! 🎉
        </p>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="text-6xl animate-pulse">🎊</div>
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transform hover:scale-110 transition-all duration-300 shadow-2xl"
          >
            🔄 Jogar Novamente
          </Button>
        </div>
        
        <div className="mt-8 text-lg opacity-80">
          <p>⭐ Você é um verdadeiro gênio da matemática! ⭐</p>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce delay-300">🎈</div>
      <div className="absolute top-20 right-10 text-6xl animate-bounce delay-700">🎈</div>
      <div className="absolute bottom-10 left-20 text-6xl animate-bounce delay-500">🎉</div>
      <div className="absolute bottom-20 right-20 text-6xl animate-bounce delay-1000">🎊</div>
    </div>
  );
};

export default VictoryAnimation;
