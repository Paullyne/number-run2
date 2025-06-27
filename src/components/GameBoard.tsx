
import React from 'react';
import Player from './Player';
import Obstacle from './Obstacle';
import { mathQuestions } from '../data/questions';

interface GameBoardProps {
  playerPosition: number;
  totalQuestions: number;
  gameState: string;
  currentQuestion: number;
  showQuestion: boolean;
  onAnswer: (answer: number) => void;
}

const GameBoard = ({ 
  playerPosition, 
  totalQuestions, 
  gameState, 
  currentQuestion, 
  showQuestion, 
  onAnswer 
}: GameBoardProps) => {
  const question = mathQuestions[currentQuestion];
  const isQuestionActive = showQuestion && currentQuestion < mathQuestions.length;

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-sky-300 via-green-200 to-green-400 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Clouds */}
        <div className="absolute top-10 left-10 w-20 h-12 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-10 bg-white rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-16 left-1/3 w-24 h-14 bg-white rounded-full opacity-50 animate-pulse delay-500"></div>
        
        {/* Trees */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-600 to-transparent"></div>
        
        {/* Mountains in background */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 300" className="w-full h-64">
            <polygon points="0,300 300,100 600,200 900,80 1200,150 1200,300" fill="#10b981" opacity="0.3"/>
            <polygon points="0,300 200,150 500,120 800,180 1200,100 1200,300" fill="#059669" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Question integrated into the scene as a magical scroll */}
      {isQuestionActive && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40 animate-fade-in">
          <div className="relative">
            {/* Magical aura around the scroll */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 rounded-lg blur-lg opacity-75 animate-pulse"></div>
            
            {/* Scroll background */}
            <div className="relative bg-gradient-to-b from-yellow-100 to-yellow-50 rounded-lg shadow-2xl p-6 border-4 border-yellow-600 max-w-2xl">
              {/* Scroll decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 bg-yellow-600 rounded-full"></div>
              
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full mb-3 text-xl font-bold shadow-lg animate-bounce">
                  ✨
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">🧙‍♂️ Desafio Mágico!</h2>
                <p className="text-sm text-gray-600">Pergunta {currentQuestion + 1} de {totalQuestions}</p>
              </div>
              
              <div className="mb-6">
                <p className="text-lg text-gray-800 font-medium text-center leading-relaxed">
                  {question.question}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => onAnswer(index)}
                    className="p-3 text-left bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 border-2 border-blue-300 hover:border-purple-400 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center mr-3 font-bold group-hover:scale-110 transition-transform">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-800 font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game path */}
      <div className="absolute bottom-20 left-0 w-full h-20 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 opacity-80">
        <div className="w-full h-full bg-yellow-400 opacity-60"></div>
        {/* Path decorations */}
        <div className="absolute top-2 left-0 w-full h-2 bg-yellow-700 opacity-50"></div>
        <div className="absolute bottom-2 left-0 w-full h-2 bg-yellow-700 opacity-50"></div>
      </div>

      {/* Player */}
      <div 
        className="absolute bottom-24 transition-all duration-1000 ease-in-out z-30"
        style={{ left: `${(playerPosition / totalQuestions) * 85 + 5}%` }}
      >
        <Player gameState={gameState} level={playerPosition} />
      </div>

      {/* Obstacles with destruction effects */}
      {Array.from({ length: totalQuestions }, (_, index) => (
        <div
          key={index}
          className="absolute bottom-32 z-20"
          style={{ left: `${((index + 1) / totalQuestions) * 85 + 5}%` }}
        >
          <Obstacle 
            type={index % 3} 
            isActive={playerPosition === index}
            isPassed={playerPosition > index}
            isDestroying={playerPosition === index && !showQuestion}
          />
        </div>
      ))}

      {/* Finish line with victory aura */}
      <div className={`absolute bottom-20 right-5 w-8 h-20 rounded-t-lg z-20 transition-all duration-500 ${
        playerPosition >= totalQuestions 
          ? 'bg-gradient-to-t from-gold-500 to-gold-300 border-4 border-gold-600 animate-pulse shadow-2xl' 
          : 'bg-gradient-to-t from-yellow-500 to-yellow-300 border-4 border-yellow-600'
      }`}>
        <div className="w-full h-2 bg-yellow-600 mt-2"></div>
        <div className="w-full h-2 bg-yellow-600 mt-2"></div>
        <div className="w-full h-2 bg-yellow-600 mt-2"></div>
        <div className="text-center text-xs font-bold text-yellow-800 mt-1">🏁</div>
        {playerPosition >= totalQuestions && (
          <div className="absolute -top-8 -left-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-gold-500 rounded-full blur-sm animate-ping opacity-75"></div>
        )}
      </div>

      {/* Progress indicator with intelligence meter */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg z-30 border-2 border-blue-200">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
            🧠
          </div>
          <h3 className="font-bold text-gray-800">Inteligência</h3>
        </div>
        <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-gold-400 transition-all duration-500 relative"
            style={{ width: `${(playerPosition / totalQuestions) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
          </div>
        </div>
        <p className="text-sm text-gray-600">Nível {playerPosition}/{totalQuestions}</p>
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full mr-1 transition-all duration-300 ${
                i < Math.floor((playerPosition / totalQuestions) * 5)
                  ? 'bg-gradient-to-r from-yellow-400 to-gold-500 animate-pulse'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Wisdom particles effect */}
      {playerPosition > 0 && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-gold-500 rounded-full animate-pulse opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameBoard;
