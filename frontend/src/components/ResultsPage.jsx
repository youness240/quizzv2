import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { calculateAIPerfumeMatch } from '../mock/perfumes';

const ResultsPage = ({ profile, onRestart }) => {
  const recommendations = calculateAIPerfumeMatch(profile);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [evaluations, setEvaluations] = useState({});
  const [finalRecommendations, setFinalRecommendations] = useState([]);

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
                      <h4 className="font-serif text-lg text-stone-800 mb-2">Notes Olfactives</h4>
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

        {/* Système d'évaluation */}
        {!showEvaluation ? (
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-serif text-stone-800 mb-4">
                Prêt(e) à Tester Vos Sélections ?
              </h3>
              <p className="text-stone-600 mb-4">
                Testez la sélection sur mesure faite pour vous et évaluez-les en cliquant sur les différentes propositions.
              </p>
              <Button 
                onClick={() => setShowEvaluation(true)}
                className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-3 font-serif text-lg"
              >
                Commencer l'Évaluation
              </Button>
            </div>
          </div>
        ) : (
          <EvaluationSection 
            perfumes={recommendations} 
            evaluations={evaluations}
            setEvaluations={setEvaluations}
            setFinalRecommendations={setFinalRecommendations}
          />
        )}

        {/* Résultats finaux */}
        {finalRecommendations.length > 0 && (
          <FinalRecommendations 
            recommendations={finalRecommendations} 
            onRestart={onRestart}
          />
        )}

        {/* Appel à l'action - Ne s'affiche que si pas d'évaluation en cours */}
        {!showEvaluation && finalRecommendations.length === 0 && (
          <div className="text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-amber-200 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif text-stone-800 mb-4">
                Continuez Votre Voyage Olfactif
              </h3>
              <p className="text-stone-600 mb-6">
                Explorez notre collection complète ou affinez ces recommandations avec l'évaluation personnalisée.
              </p>
              <Button 
                variant="outline" 
                onClick={onRestart}
                className="border-amber-200 text-stone-700 hover:bg-amber-50 px-8 py-3 font-serif text-lg"
              >
                Nouveau Portrait
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour l'évaluation des parfums
const EvaluationSection = ({ perfumes, evaluations, setEvaluations, setFinalRecommendations }) => {
  const evaluationOptions = [
    { id: 'trop_floral', label: 'Trop Floral', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'trop_boise', label: 'Trop Boisé', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'trop_sucre', label: 'Trop Sucré', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'trop_fort', label: 'Trop Fort', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'pas_assez_intense', label: 'Pas Assez Intense', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { id: 'coup_de_coeur', label: '❤️ Coup de Cœur', color: 'bg-rose-100 text-rose-800 border-rose-200' }
  ];

  const handleEvaluation = (perfumeId, evaluationId) => {
    setEvaluations(prev => ({
      ...prev,
      [perfumeId]: evaluationId
    }));
  };

  const handleSubmitEvaluation = () => {
    // Filtrer les parfums avec coup de cœur
    const favorites = perfumes.filter(p => evaluations[p.id] === 'coup_de_coeur');
    
    let finalPerfumes = [];
    
    if (favorites.length >= 3) {
      // Si 3 ou plus coups de cœur, prendre les 3 premiers
      finalPerfumes = favorites.slice(0, 3);
    } else {
      // Sinon, prendre tous les coups de cœur et compléter avec les mieux notés
      finalPerfumes = [...favorites];
      const remaining = perfumes.filter(p => 
        evaluations[p.id] !== 'coup_de_coeur' && 
        evaluations[p.id] && 
        evaluations[p.id] !== 'trop_fort'
      );
      finalPerfumes = [...finalPerfumes, ...remaining].slice(0, 3);
    }
    
    setFinalRecommendations(finalPerfumes);
  };

  const allEvaluated = perfumes.every(p => evaluations[p.id]);

  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif text-stone-800 mb-4">
          Évaluez Vos Sélections
        </h3>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Testez chaque parfum et donnez-nous votre ressenti pour affiner vos recommandations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {perfumes.map((perfume) => (
          <Card key={perfume.id} className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-serif text-stone-800 mb-2">
                {perfume.name}
              </CardTitle>
              <Badge variant="outline" className="text-stone-600 border-stone-300">
                {perfume.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {evaluationOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={evaluations[perfume.id] === option.id ? "default" : "outline"}
                    className={`w-full text-sm ${
                      evaluations[perfume.id] === option.id 
                        ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white' 
                        : option.color
                    }`}
                    onClick={() => handleEvaluation(perfume.id, option.id)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {allEvaluated && (
        <div className="text-center">
          <Button 
            onClick={handleSubmitEvaluation}
            className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-3 font-serif text-lg"
          >
            Découvrir Mes 3 Parfums Idéaux
          </Button>
        </div>
      )}
    </div>
  );
};

// Composant pour les recommandations finales
const FinalRecommendations = ({ recommendations, onRestart }) => {
  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-serif text-stone-800 mb-4">
          Vos 3 Parfums Idéaux
        </h3>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Basé sur vos évaluations, voici votre sélection personnalisée parfaite
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {recommendations.map((perfume, index) => (
          <Card key={perfume.id} className="bg-gradient-to-br from-white/90 to-amber-50/90 backdrop-blur-sm border-amber-200 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="mb-4">
                <Badge 
                  variant="secondary" 
                  className={`mb-3 text-amber-800 border-amber-200 ${
                    index === 0 ? 'bg-gradient-to-r from-amber-100 to-rose-100' :
                    index === 1 ? 'bg-gradient-to-r from-rose-100 to-amber-100' :
                    'bg-gradient-to-r from-amber-50 to-rose-50'
                  }`}
                >
                  {index === 0 ? '🥇 Premier Choix' : 
                   index === 1 ? '🥈 Deuxième Choix' : 
                   '🥉 Troisième Choix'}
                </Badge>
              </div>
              <CardTitle className="text-2xl font-serif text-stone-800 mb-2">
                {perfume.name}
              </CardTitle>
              <Badge variant="outline" className="text-stone-600 border-stone-300">
                {perfume.category}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-stone-600 italic text-center mb-4 leading-relaxed">
                "{perfume.description}"
              </p>
              <div className="space-y-3">
                <div>
                  <h4 className="font-serif text-lg text-stone-800 mb-2">Notes Principales</h4>
                  <div className="flex flex-wrap gap-2">
                    {perfume.notes.slice(0, 3).map((note, noteIndex) => (
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-amber-200 shadow-lg max-w-2xl mx-auto">
          <h3 className="text-2xl font-serif text-stone-800 mb-4">
            Félicitations !
          </h3>
          <p className="text-stone-600 mb-6">
            Votre sélection personnalisée est prête. Découvrez ces fragrances exceptionnelles dans notre showroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-3 font-serif text-lg"
            >
              Visiter le Showroom
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
  );
};

export default ResultsPage;