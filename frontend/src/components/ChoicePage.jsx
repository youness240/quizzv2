import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const ChoicePage = ({ onChooseQuiz, onChoosePerfumeInput }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
            Comment Souhaitez-vous Découvrir Votre Essence ?
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Deux chemins s'offrent à vous pour révéler votre signature olfactive unique.
            Choisissez celui qui résonne le plus avec votre âme.
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Option 1: Quiz */}
          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl hover:shadow-2xl cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-stone-800 mb-4">
                  Voyage Introspectif
                </h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Laissez-vous guider par un questionnaire poétique qui explore vos émotions,
                  vos goûts et votre style de vie pour révéler votre profil olfactif unique.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-stone-600">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  Questions sur votre personnalité
                </div>
                <div className="flex items-center justify-center text-sm text-stone-600">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  Exploration de vos préférences
                </div>
                <div className="flex items-center justify-center text-sm text-stone-600">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  Analyse de votre style de vie
                </div>
              </div>

              <Button 
                onClick={onChooseQuiz}
                className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-4 font-serif text-lg rounded-full group-hover:scale-105 transition-all duration-300"
              >
                Commencer le Quiz
              </Button>
            </CardContent>
          </Card>

          {/* Option 2: Parfums */}
          <Card className="group hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl hover:shadow-2xl cursor-pointer">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif text-stone-800 mb-4">
                  Mémoire Olfactive
                </h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  Partagez avec nous 3 parfums que vous avez portés ou aimés.
                  Notre intelligence artificielle analysera vos préférences olfactives.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center text-sm text-stone-600">
                  <span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>
                  Reconnaissance intelligente
                </div>
                <div className="flex items-center justify-center text-sm text-stone-600">
                  <span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>
                  Analyse des compositions
                </div>
                <div className="flex items-center justify-center text-sm text-stone-600">
                  <span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>
                  Profil olfactif personnalisé
                </div>
              </div>

              <Button 
                onClick={onChoosePerfumeInput}
                className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white px-8 py-4 font-serif text-lg rounded-full group-hover:scale-105 transition-all duration-300"
              >
                Saisir Mes Parfums
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Note explicative */}
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg max-w-2xl mx-auto">
            <p className="text-stone-600 leading-relaxed">
              <span className="text-amber-800 font-serif">✨ Note :</span>
              Dans les deux cas, vous découvrirez votre portrait olfactif unique, 
              suivi de nos recommandations personnalisées de la Collection Azynti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoicePage;