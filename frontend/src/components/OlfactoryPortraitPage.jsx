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

        {/* Portrait Principal */}
        <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-2xl mb-8">
          <CardHeader className="text-center pb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-serif text-stone-800">
              Votre Essence Olfactive
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Description poétique */}
            <div className="text-center mb-8">
              <p className="text-2xl font-serif text-stone-700 italic leading-relaxed">
                "{profile.portrait_text}"
              </p>
            </div>

            {/* Grille des caractéristiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Familles Olfactives */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-stone-800 text-center">
                  Vos Familles Olfactives
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {profile.olfactory_families.map((family, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-amber-100 to-rose-100 text-amber-800 border-amber-200 px-4 py-2 text-sm font-serif capitalize"
                    >
                      {family}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Traits de Personnalité */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-stone-800 text-center">
                  Vos Traits Olfactifs
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {profile.personality_traits.map((trait, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="text-stone-700 border-stone-300 px-4 py-2 text-sm font-serif capitalize"
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Intensité */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-stone-800 text-center">
                  Votre Intensité
                </h3>
                <div className="flex justify-center">
                  <Badge 
                    variant="secondary"
                    className="bg-gradient-to-r from-rose-100 to-amber-100 text-rose-800 border-rose-200 px-6 py-3 text-base font-serif capitalize"
                  >
                    {profile.intensity}
                  </Badge>
                </div>
              </div>

              {/* Sillage */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-stone-800 text-center">
                  Votre Sillage
                </h3>
                <div className="flex justify-center">
                  <Badge 
                    variant="secondary"
                    className="bg-gradient-to-r from-amber-100 to-rose-100 text-amber-800 border-amber-200 px-6 py-3 text-base font-serif capitalize"
                  >
                    {profile.sillage}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tons Émotionnels */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-serif text-stone-800 text-center">
                Votre Palette Émotionnelle
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {profile.emotional_tone.map((tone, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="text-stone-600 border-stone-300 px-4 py-2 text-sm font-serif capitalize"
                  >
                    {tone}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

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