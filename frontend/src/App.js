import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [quizAnswers, setQuizAnswers] = useState([]);

  const handleStartQuiz = () => {
    setCurrentPage('quiz');
    setQuizAnswers([]);
  };

  const handleQuizComplete = (answers) => {
    setQuizAnswers(answers);
    setCurrentPage('results');
  };

  const handleRestart = () => {
    setCurrentPage('home');
    setQuizAnswers([]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              {currentPage === 'home' && (
                <HomePage onStartQuiz={handleStartQuiz} />
              )}
              {currentPage === 'quiz' && (
                <QuizPage onComplete={handleQuizComplete} />
              )}
              {currentPage === 'results' && (
                <ResultsPage 
                  answers={quizAnswers} 
                  onRestart={handleRestart} 
                />
              )}
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;