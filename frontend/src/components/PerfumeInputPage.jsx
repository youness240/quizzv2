import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

const PerfumeInputPage = ({ onComplete }) => {
  const [perfumes, setPerfumes] = useState(['', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (index, value) => {
    const newPerfumes = [...perfumes];
    newPerfumes[index] = value;
    setPerfumes(newPerfumes);
  };

  const handleSubmit = async () => {
    // Vérifier qu'au moins 2 parfums sont renseignés
    const filledPerfumes = perfumes.filter(p => p.trim() !== '');
    if (filledPerfumes.length < 2) {
      setError('Veuillez renseigner au moins 2 parfums.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analyze-perfumes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          perfumes: filledPerfumes
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
  };

  const isSubmitDisabled = perfumes.filter(p => p.trim() !== '').length < 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-stone-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4">
            Vos Parfums Signature
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Partagez avec nous les parfums qui ont marqué votre mémoire olfactive.
            Notre intelligence artificielle analysera vos préférences pour créer votre profil unique.
          </p>
        </div>

        {/* Formulaire */}
        <Card className="bg-white/80 backdrop-blur-sm border-amber-200 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-serif text-stone-800 text-center">
              Renseignez Vos Parfums
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {perfumes.map((perfume, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-lg font-serif text-stone-700 block">
                    Parfum {index + 1} {index < 2 && <span className="text-rose-600">*</span>}
                  </label>
                  <Input
                    type="text"
                    placeholder={`Ex: Chanel No. 5, Dior Sauvage, Tom Ford Black Orchid...`}
                    value={perfume}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="text-lg p-4 border-amber-200 focus:border-amber-400 focus:ring-amber-400 rounded-lg"
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}

            <div className="mt-8 text-center">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitDisabled || isLoading}
                className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white px-12 py-4 font-serif text-xl rounded-full shadow-2xl transition-all duration-300 disabled:opacity-50"
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
                  'Analyser Mes Parfums'
                )}
              </Button>
            </div>

            <div className="mt-6 text-center text-sm text-stone-600">
              <p>
                <span className="text-rose-600">*</span> Champs obligatoires - Au moins 2 parfums requis
              </p>
              <p className="mt-2">
                ✨ Pas de souci pour l'orthographe exacte, notre IA reconnaît les parfums !
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Note explicative */}
        <div className="mt-8 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-amber-200 shadow-lg max-w-2xl mx-auto">
            <p className="text-stone-600 leading-relaxed">
              <span className="text-amber-800 font-serif">💡 Astuce :</span>
              Mentionnez des parfums que vous avez portés, aimés ou simplement sentis et appréciés.
              Plus vos références sont variées, plus votre profil sera précis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeInputPage;