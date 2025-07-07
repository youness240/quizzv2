import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { quizQuestions } from '../mock/perfumes';

const QuizPage = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (optionValue) => {
    setSelectedOption(optionValue);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswers = [...answers, {
      questionId: quizQuestions[currentQuestion].id,
      value: selectedOption
    }];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers[currentQuestion - 1];
      setSelectedOption(previousAnswer ? previousAnswer.value : '');
      setAnswers(answers.slice(0, -1));
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-stone-600 font-medium">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-stone-600 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div key={currentQuestion}>
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-8 leading-relaxed">
                {question.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <div key={option.value}>
                    <Button
                      variant={selectedOption === option.value ? "default" : "outline"}
                      className={`w-full p-6 text-left justify-start h-auto font-serif text-lg transition-all duration-300 ${
                        selectedOption === option.value
                          ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white border-amber-300 shadow-lg'
                          : 'bg-white/60 text-stone-700 border-amber-200 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      {option.label}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-8 py-3 font-serif text-lg border-amber-200 hover:bg-amber-50 disabled:opacity-50"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="px-8 py-3 font-serif text-lg bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white disabled:opacity-50"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Discover My Scents' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;