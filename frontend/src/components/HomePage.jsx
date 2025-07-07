import React from 'react';
import { Button } from './ui/button';

const HomePage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50 relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-serif text-amber-900 mb-4 tracking-wide">
            Atelier
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto opacity-60"></div>
        </div>

        {/* Poetic invitation */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-2xl md:text-3xl font-serif text-stone-700 leading-relaxed mb-8 italic">
            "In the silence between heartbeats,
            <br />
            your perfect scent awaits discovery."
          </p>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Embark on a sensory journey through questions that dance with your soul, 
            unveiling fragrances that speak your unspoken language.
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <Button 
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-12 py-6 text-xl font-serif rounded-full shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-300"
          >
            Begin Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;