import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { calculateAIPerfumeMatch } from '../mock/perfumes';

const ResultsPage = ({ profile, onRestart }) => {
  const recommendations = calculateAIPerfumeMatch(profile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
            Vos Parfums Parfaits
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Basé sur votre portrait olfactif unique, nous avons sélectionné cinq fragrances exceptionnelles qui parlent à votre âme.
          </p>
        </div>

        {/* Recommandations - 5 parfums */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recommendations.map((perfume, index) => (
            <div key={perfume.id} className={`transform hover:scale-105 transition-all duration-300 ${index < 2 ? 'lg:col-span-1' : index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              <Card className="h-full bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mb-4">
                    <Badge 
                      variant="secondary" 
                      className={`mb-3 text-amber-800 border-amber-200 ${
                        index === 0 ? 'bg-gradient-to-r from-amber-100 to-rose-100' :
                        index === 1 ? 'bg-gradient-to-r from-rose-100 to-amber-100' :
                        index === 2 ? 'bg-gradient-to-r from-amber-50 to-rose-50' :
                        index === 3 ? 'bg-gradient-to-r from-rose-50 to-stone-50' :
                        'bg-gradient-to-r from-stone-50 to-amber-50'
                      }`}
                    >
                      {index === 0 ? 'Correspondance Parfaite' : 
                       index === 1 ? 'Correspondance Excellente' : 
                       index === 2 ? 'Correspondance Très Bonne' :
                       index === 3 ? 'Correspondance Intrigante' :
                       'Correspondance Découverte'}
                    </Badge>
                    {perfume.matchPercentage && (
                      <div className="text-sm text-stone-600">
                        {perfume.matchPercentage}% de compatibilité
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-serif text-stone-800 mb-2">
                    {perfume.name}
                  </CardTitle>
                  <Badge variant="outline" className="text-stone-600 border-stone-300">
                    {perfume.category}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-stone-600 italic text-center mb-6 leading-relaxed">
                    "{perfume.description}"
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-serif text-lg text-stone-800 mb-2">Notes Principales</h4>
                      <div className="flex flex-wrap gap-2">
                        {perfume.notes.slice(0, 4).map((note, noteIndex) => (
                          <Badge 
                            key={noteIndex} 
                            variant="secondary"
                            className="bg-amber-50 text-amber-800 border-amber-200 text-sm"
                          >
                            {note}
                          </Badge>
                        ))}
                        {perfume.notes.length > 4 && (
                          <Badge 
                            variant="secondary"
                            className="bg-stone-50 text-stone-600 border-stone-200 text-sm"
                          >
                            +{perfume.notes.length - 4} autres
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-serif text-lg text-stone-800 mb-2">Votre Essence</h4>
                      <div className="flex flex-wrap gap-2">
                        {perfume.personality.slice(0, 3).map((trait, traitIndex) => (
                          <Badge 
                            key={traitIndex} 
                            variant="outline"
                            className="text-stone-600 border-stone-300 text-sm capitalize"
                          >
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Note sur l'évaluation */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-rose-50 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-serif text-stone-800 mb-4">
              Prêt(e) à Tester Vos Sélections ?
            </h3>
            <p className="text-stone-600 mb-4">
              Visitez notre showroom pour découvrir ces fragrances en personne et affinez vos préférences grâce à notre système d'évaluation personnalisé.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-stone-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                Test en direct
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>
                Évaluation intuitive
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-stone-400 rounded-full mr-2"></span>
                Correspondance affinée
              </div>
            </div>
          </div>
        </div>

        {/* Appel à l'action */}
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-amber-200 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif text-stone-800 mb-4">
              Continuez Votre Voyage Olfactif
            </h3>
            <p className="text-stone-600 mb-6">
              Explorez notre collection complète ou affinez ces recommandations lors de votre visite en showroom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-3 font-serif text-lg"
              >
                Évaluer au Showroom
              </Button>
              <Button 
                variant="outline" 
                onClick={onRestart}
                className="border-amber-200 text-stone-700 hover:bg-amber-50 px-8 py-3 font-serif text-lg"
              >
                Nouveau Portrait
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;