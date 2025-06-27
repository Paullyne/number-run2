
import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import VictoryAnimation from './VictoryAnimation';
import { mathQuestions } from '../data/questions';

const MathGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);
  const [gameState, setGameState] = useState('playing');
  const [playerPosition, setPlayerPosition] = useState(0);

  useEffect(() => {
    console.log('Estado atual:', { currentQuestion, playerPosition, showQuestion, gameState });
    
    if (currentQuestion >= mathQuestions.length) {
      setGameState('victory');
      return;
    }

    if (playerPosition === currentQuestion && !showQuestion && gameState === 'playing') {
      setShowQuestion(true);
    }
  }, [playerPosition, currentQuestion, showQuestion, gameState]);

  const handleAnswer = (selectedAnswer: number) => {
    const correct = mathQuestions[currentQuestion].correct;
    console.log('Resposta selecionada:', selectedAnswer, 'Correta:', correct);
    
    if (selectedAnswer === correct) {
      setShowQuestion(false);
      const nextQuestion = currentQuestion + 1;
      const nextPosition = playerPosition + 1;
      
      setCurrentQuestion(nextQuestion);
      setPlayerPosition(nextPosition);
      
      if (nextQuestion < mathQuestions.length) {
        setTimeout(() => {
          setShowQuestion(true);
        }, 500);
      }
    } else {
      console.log('Resposta errada - reiniciando jogo');
      setGameState('dead');
      setTimeout(() => {
        setCurrentQuestion(0);
        setPlayerPosition(0);
        setGameState('playing');
        setShowQuestion(true);
      }, 2000);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setPlayerPosition(0);
    setGameState('playing');
    setShowQuestion(true);
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
        currentQuestion={currentQuestion}
        showQuestion={showQuestion}
        onAnswer={handleAnswer}
      />
      
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
