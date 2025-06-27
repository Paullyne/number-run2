
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

      {/* Question integrated in background */}
      {showQuestion && currentQuestion < mathQuestions.length && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40">
          <div className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 border-4 border-yellow-400">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-4 text-2xl font-bold shadow-lg">
                {currentQuestion + 1}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🧮 Desafio Matemático!</h2>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500" 
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Pergunta {currentQuestion + 1} de {totalQuestions}
              </p>
            </div>
            
            <div className="mb-8">
              <p className="text-xl text-gray-800 font-medium leading-relaxed text-center">
                {question.question}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => onAnswer(index)}
                  className="w-full p-4 text-left bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-2 border-blue-200 hover:border-blue-400 rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center mr-4 font-bold text-lg group-hover:scale-110 transition-transform">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                💡 Escolha a resposta correta para continuar sua jornada!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Game path */}
      <div className="absolute bottom-20 left-0 w-full h-20 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 opacity-80">
        <div className="w-full h-full bg-yellow-400 opacity-60"></div>
      </div>

      {/* Player */}
      <div 
        className="absolute bottom-24 transition-all duration-1000 ease-in-out z-30"
        style={{ left: `${(playerPosition / totalQuestions) * 85 + 5}%` }}
      >
        <Player gameState={gameState} />
      </div>

      {/* Obstacles */}
      {Array.from({ length: totalQuestions }, (_, index) => (
        <div
          key={index}
          className="absolute bottom-32 z-20"
          style={{ left: `${((index + 1) / totalQuestions) * 85 + 5}%` }}
        >
          <Obstacle 
            type={index % 3} 
            isActive={playerPosition === index + 1}
            isPassed={playerPosition > index + 1}
          />
        </div>
      ))}

      {/* Finish line */}
      <div className="absolute bottom-20 right-5 w-8 h-20 bg-gradient-to-t from-yellow-500 to-yellow-300 border-4 border-yellow-600 rounded-t-lg z-20">
        <div className="w-full h-2 bg-yellow-600 mt-2"></div>
        <div className="w-full h-2 bg-yellow-600 mt-2"></div>
        <div className="w-full h-2 bg-yellow-600 mt-2"></div>
        <div className="text-center text-xs font-bold text-yellow-800 mt-1">🏁</div>
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-4 shadow-lg z-30">
        <h3 className="font-bold text-gray-800 mb-2">Progresso</h3>
        <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-500"
            style={{ width: `${(playerPosition / totalQuestions) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{playerPosition}/{totalQuestions} desafios</p>
      </div>
    </div>
  );
};

export default GameBoard;
