import React, { useState } from 'react';
import { Heart, Check, ArrowRight, X } from 'lucide-react';

interface BusinessQuestionnaireProps {
  onComplete: (answers: Record<string, string[]>) => void;
  onBack: () => void;
  onClose: () => void;
}

const questions = [
  {
    id: 'faith_impact',
    text: "Do you believe that even the smallest act of faith can create extraordinary change?",
    type: 'radio',
    options: [{ value: 'yes', label: 'Yes, I believe in the power of small acts of faith' }]
  },
  {
    id: 'hands_feet',
    text: "Do you agree that we are called to be the hands and feet of Jesus, spreading His love and hope?",
    type: 'radio',
    options: [{ value: 'yes', label: 'Yes, I want to be His hands and feet' }]
  },
  {
    id: 'guide_youth',
    text: "Do you believe it's our responsibility to guide the next generation toward their God-given purpose?",
    type: 'radio',
    options: [{ value: 'yes', label: 'Yes, I want to help guide young people' }]
  },
  {
    id: 'share_message',
    text: "Do you agree that sharing the message of faith and hope is a powerful way to lead others to Christ?",
    type: 'radio',
    options: [{ value: 'yes', label: 'Yes, I want to share His message' }]
  },
  {
    id: 'move_mountains',
    text: "Do you believe that together, through small acts of faith, we can move mountains and change lives?",
    type: 'radio',
    options: [{ value: 'yes', label: 'Yes, together we can move mountains' }]
  }
];

export default function BusinessQuestionnaire({ onComplete, onBack, onClose }: BusinessQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: [value]
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex-1 flex justify-center gap-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 rounded-full ${
                index <= currentQuestion ? 'bg-patriot-red' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-patriot-red mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-patriot-navy mb-4">
          {question.text}
        </h3>
      </div>

      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(question.id, option.value)}
            className="w-full flex items-center justify-between p-4 rounded-xl border-2 transition-colors hover:border-patriot-red hover:bg-patriot-cream"
          >
            <span className="text-left text-patriot-navy">{option.label}</span>
            <Check className="w-5 h-5 text-patriot-red opacity-0 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
}