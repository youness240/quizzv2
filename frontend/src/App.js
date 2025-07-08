import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ChoicePage from './components/ChoicePage';
import QuizPage from './components/QuizPage';
import PerfumeInputPage from './components/PerfumeInputPage';
import OlfactoryPortraitPage from './components/OlfactoryPortraitPage';
import ResultsPage from './components/ResultsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [olfactoryProfile, setOlfactoryProfile] = useState(null);

  const handleStartJourney = () => {
    setCurrentPage('choice');
  };

  const handleChooseQuiz = () => {
    setCurrentPage('quiz');
  };

  const handleChoosePerfumeInput = () => {
    setCurrentPage('perfume-input');
  };

  const handleProfileComplete = (profile) => {
    setOlfactoryProfile(profile);
    setCurrentPage('portrait');
  };

  const handleContinueToRecommendations = () => {
    setCurrentPage('results');
    // Scroll vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentPage('home');
    setOlfactoryProfile(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              {currentPage === 'home' && (
                <HomePage onStartJourney={handleStartJourney} />
              )}
              {currentPage === 'choice' && (
                <ChoicePage 
                  onChooseQuiz={handleChooseQuiz}
                  onChoosePerfumeInput={handleChoosePerfumeInput}
                />
              )}
              {currentPage === 'quiz' && (
                <QuizPage onComplete={handleProfileComplete} />
              )}
              {currentPage === 'perfume-input' && (
                <PerfumeInputPage onComplete={handleProfileComplete} />
              )}
              {currentPage === 'portrait' && olfactoryProfile && (
                <OlfactoryPortraitPage 
                  profile={olfactoryProfile}
                  onContinue={handleContinueToRecommendations}
                />
              )}
              {currentPage === 'results' && olfactoryProfile && (
                <ResultsPage 
                  profile={olfactoryProfile}
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