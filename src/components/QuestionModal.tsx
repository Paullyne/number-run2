
import React from 'react';
import { Button } from '@/components/ui/button';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuestionModalProps {
  question: Question;
  onAnswer: (answer: number) => void;
  questionNumber: number;
}

const QuestionModal = ({ question, onAnswer, questionNumber }: QuestionModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mb-4 text-xl font-bold">
            {questionNumber}
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Desafio Matemático!</h2>
          <div className="w-full h-1 bg-gray-200 rounded-full">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${(questionNumber / 10) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-lg text-gray-700 font-medium leading-relaxed">
            {question.question}
          </p>
        </div>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onAnswer(index)}
              variant="outline"
              className="w-full p-4 text-left hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-200 border-2"
            >
              <span className="flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-800 font-medium">{option}</span>
              </span>
            </Button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 Escolha a resposta correta para continuar sua jornada!
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
