
import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import QuestionModal from './QuestionModal';
import VictoryAnimation from './VictoryAnimation';
import { mathQuestions } from '../data/questions';

const MathGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'dead', 'victory'
  const [playerPosition, setPlayerPosition] = useState(0);

  useEffect(() => {
    if (playerPosition === currentQuestion + 1 && currentQuestion < mathQuestions.length) {
      setShowQuestion(true);
    } else if (currentQuestion === mathQuestions.length) {
      setGameState('victory');
    }
  }, [playerPosition, currentQuestion]);

  const handleAnswer = (selectedAnswer: number) => {
    const correct = mathQuestions[currentQuestion].correct;
    
    if (selectedAnswer === correct) {
      setShowQuestion(false);
      setCurrentQuestion(prev => prev + 1);
      setPlayerPosition(prev => prev + 1);
    } else {
      setGameState('dead');
      setTimeout(() => {
        // Reset game
        setCurrentQuestion(0);
        setPlayerPosition(0);
        setGameState('playing');
        setShowQuestion(false);
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setPlayerPosition(0);
    setGameState('playing');
    setShowQuestion(false);
  };

  if (gameState === 'victory') {
    return <VictoryAnimation onRestart={resetGame} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GameBoard 
        playerPosition={playerPosition}
        totalQuestions={mathQuestions.length}
        gameState={gameState}
      />
      
      {showQuestion && (
        <QuestionModal
          question={mathQuestions[currentQuestion]}
          onAnswer={handleAnswer}
          questionNumber={currentQuestion + 1}
        />
      )}
      
      {gameState === 'dead' && (
        <div className="absolute inset-0 bg-red-500 bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-white text-center animate-pulse">
            <h2 className="text-4xl font-bold mb-4">💀 Game Over!</h2>
            <p className="text-xl">Resposta incorreta! Reiniciando...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathGame;
