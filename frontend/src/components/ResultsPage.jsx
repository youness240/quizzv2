import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { calculatePerfumeMatch } from '../mock/perfumes';

const ResultsPage = ({ answers, onRestart }) => {
  const recommendations = calculatePerfumeMatch(answers);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
            Votre Voyage Olfactif
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto">
            Basé sur votre essence unique, nous avons sélectionné trois fragrances exceptionnelles qui parlent à votre âme.
          </p>
        </div>

        {/* Recommandations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {recommendations.map((perfume, index) => (
            <div key={perfume.id} className="transform hover:scale-105 transition-all duration-300">
              <Card className="h-full bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mb-4">
                    <Badge 
                      variant="secondary" 
                      className="mb-3 bg-gradient-to-r from-amber-100 to-rose-100 text-amber-800 border-amber-200"
                    >
                      {index === 0 ? 'Correspondance Parfaite' : index === 1 ? 'Correspondance Proche' : 'Correspondance Intrigante'}
                    </Badge>
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
                        {perfume.notes.map((note, noteIndex) => (
                          <Badge 
                            key={noteIndex} 
                            variant="secondary"
                            className="bg-amber-50 text-amber-800 border-amber-200 text-sm"
                          >
                            {note}
                          </Badge>
                        ))}
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

        {/* Appel à l'action */}
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-amber-200 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif text-stone-800 mb-4">
              Prêt(e) à Découvrir Votre Signature Olfactive ?
            </h3>
            <p className="text-stone-600 mb-6">
              Visitez notre atelier pour découvrir ces fragrances en personne, ou explorez notre collection complète en ligne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-3 font-serif text-lg"
              >
                Explorer la Collection
              </Button>
              <Button 
                variant="outline" 
                onClick={onRestart}
                className="border-amber-200 text-stone-700 hover:bg-amber-50 px-8 py-3 font-serif text-lg"
              >
                Refaire le Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;