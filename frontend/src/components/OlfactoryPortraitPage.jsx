import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const OlfactoryPortraitPage = ({ profile, onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
            Votre Portrait Olfactif
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Découvrez l'essence unique de votre personnalité olfactive, 
            révélée par notre analyse approfondie.
          </p>
        </div>

        {/* Portrait Principal - Carte Olfactive Redesignée */}
        <div className="relative mb-8">
          {/* Carte principale avec design luxury */}
          <Card className="bg-gradient-to-br from-white via-amber-50/30 to-rose-50/30 backdrop-blur-sm border-2 border-amber-200/50 shadow-2xl rounded-3xl overflow-hidden">
            {/* Header avec illustration */}
            <CardHeader className="text-center pb-8 pt-12 relative">
              {/* Decoration background */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-rose-100/20"></div>
              
              {/* Cercle central avec icône */}
              <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-amber-400 via-rose-400 to-stone-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <div className="w-28 h-28 bg-gradient-to-br from-white/90 to-amber-50/90 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              
              <CardTitle className="text-4xl font-serif text-stone-800 mb-2 relative z-10">
                Votre Carte Olfactive
              </CardTitle>
              <p className="text-lg text-stone-600 relative z-10">
                Une signature unique révélée par l'intelligence artificielle
              </p>
            </CardHeader>
            
            <CardContent className="p-12 relative">
              {/* Description poétique avec design amélioré */}
              <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-amber-50 to-rose-50 border-2 border-amber-200/50 rounded-2xl p-8 shadow-lg">
                  <div className="text-amber-700 text-6xl mb-4">❝</div>
                  <p className="text-2xl font-serif text-stone-700 italic leading-relaxed">
                    {profile.portrait_text}
                  </p>
                  <div className="text-amber-700 text-6xl mt-4">❞</div>
                </div>
              </div>

              {/* Grille des caractéristiques redesignée */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Familles Olfactives */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif text-stone-800 mb-4">
                      Familles Olfactives
                    </h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {profile.olfactory_families.map((family, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="bg-gradient-to-r from-amber-100 to-rose-100 text-amber-800 border-amber-300 px-6 py-3 text-base font-serif capitalize rounded-full shadow-md"
                        >
                          {family}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Traits de Personnalité */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-amber-400 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif text-stone-800 mb-4">
                      Personnalité Olfactive
                    </h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg">
                    <div className="flex flex-wrap gap-3 justify-center">
                      {profile.personality_traits.map((trait, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="text-stone-700 border-stone-400 bg-white/80 px-6 py-3 text-base font-serif capitalize rounded-full shadow-md"
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Intensité et Sillage - Design horizontal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-stone-400 to-amber-400 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif text-stone-800 mb-4">
                      Intensité
                    </h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg text-center">
                    <Badge 
                      variant="secondary"
                      className="bg-gradient-to-r from-rose-100 to-amber-100 text-rose-800 border-rose-300 px-8 py-4 text-xl font-serif capitalize rounded-full shadow-md"
                    >
                      {profile.intensity}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-stone-400 rounded-full mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif text-stone-800 mb-4">
                      Sillage
                    </h3>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg text-center">
                    <Badge 
                      variant="secondary"
                      className="bg-gradient-to-r from-amber-100 to-rose-100 text-amber-800 border-amber-300 px-8 py-4 text-xl font-serif capitalize rounded-full shadow-md"
                    >
                      {profile.sillage}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Tons Émotionnels */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-400 to-stone-400 rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif text-stone-800 mb-4">
                    Palette Émotionnelle
                  </h3>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg">
                  <div className="flex flex-wrap gap-3 justify-center">
                    {profile.emotional_tone.map((tone, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-stone-600 border-stone-400 bg-white/80 px-6 py-3 text-base font-serif capitalize rounded-full shadow-md"
                      >
                        {tone}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bouton de continuation */}
        <div className="text-center">
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-12 py-4 font-serif text-xl rounded-full shadow-2xl transition-all duration-300"
          >
            Découvrir Mes Parfums Parfaits
          </Button>
        </div>

        {/* Note explicative */}
        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg max-w-2xl mx-auto">
            <p className="text-stone-600 leading-relaxed">
              <span className="text-amber-800 font-serif">✨ Prochaine étape :</span>
              Basé sur ce portrait unique, nous avons sélectionné 5 fragrances exceptionnelles
              de la Collection Azynti qui résonnent parfaitement avec votre essence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OlfactoryPortraitPage;