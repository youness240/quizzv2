import React from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const HomePage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200 rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0.3, 0.8, 0.3],
              scale: [null, 1.2, null]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Logo/Brand */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-amber-900 mb-4 tracking-wide">
            Atelier
          </h1>
          <div className="w-32 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto opacity-60"></div>
        </motion.div>

        {/* Poetic invitation */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p className="text-2xl md:text-3xl font-serif text-stone-700 leading-relaxed mb-8 italic">
            "In the silence between heartbeats,
            <br />
            your perfect scent awaits discovery."
          </p>
          <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Embark on a sensory journey through questions that dance with your soul, 
            unveiling fragrances that speak your unspoken language.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-12 py-6 text-xl font-serif rounded-full shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-amber-300"
          >
            Begin Your Journey
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 border border-amber-300 rounded-full opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-16 h-16 border border-rose-300 rounded-full opacity-30"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default HomePage;