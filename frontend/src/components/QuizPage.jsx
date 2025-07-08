import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { quizQuestions } from '../mock/perfumes';

const QuizPage = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptionSelect = (optionValue) => {
    setSelectedOption(optionValue);
  };

  const handleNext = async () => {
    if (!selectedOption) return;

    const newAnswers = [...answers, {
      questionId: String(quizQuestions[currentQuestion].id),
      value: selectedOption
    }];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      // Quiz terminé, analyser avec IA
      setIsLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analyze-quiz`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: newAnswers
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'analyse');
        }

        const profile = await response.json();
        onComplete(profile);
      } catch (err) {
        setError('Une erreur est survenue lors de l\'analyse. Veuillez réessayer.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
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
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-stone-600 font-medium">
              Question {currentQuestion + 1} sur {quizQuestions.length}
            </span>
            <span className="text-sm text-stone-600 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Carte de question */}
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
                      disabled={isLoading}
                    >
                      {option.label}
                    </Button>
                  </div>
                ))}
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-center">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0 || isLoading}
            className="px-8 py-3 font-serif text-lg border-amber-200 hover:bg-amber-50 disabled:opacity-50"
          >
            Précédent
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedOption || isLoading}
            className="px-8 py-3 font-serif text-lg bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyse en cours...
              </div>
            ) : (
              currentQuestion === quizQuestions.length - 1 ? 'Créer Mon Portrait' : 'Suivant'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;