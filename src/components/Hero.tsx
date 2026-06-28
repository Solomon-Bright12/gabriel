'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { paintings } from '../lib/data';
import PaintingCard from './PaintingCard';

export default function Hero() {
  const heroPaintings = paintings.slice(0, 3); 
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Floating Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-full max-w-7xl h-full flex items-center justify-between px-10 opacity-40 mix-blend-screen">
          <div className="w-1/4 transform -translate-y-20 rotate-[-5deg] pointer-events-auto">
            <PaintingCard 
              painting={heroPaintings[0]} 
              onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
              floatDelay={0}
              floatDuration={6}
            />
          </div>
          <div className="w-1/5 transform translate-y-32 rotate-[3deg] pointer-events-auto">
            <PaintingCard 
              painting={heroPaintings[1]} 
              onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
              floatDelay={1.5}
              floatDuration={8}
            />
          </div>
          <div className="w-1/4 transform -translate-y-10 rotate-[8deg] pointer-events-auto">
            <PaintingCard 
              painting={heroPaintings[2]} 
              onClick={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
              floatDelay={0.5}
              floatDuration={7}
            />
          </div>
        </div>
      </div>

      {/* Central Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="font-sans text-xs sm:text-sm tracking-[0.3em] text-amberGold uppercase mb-4 block">
            Traditional & Digital Art
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl text-white font-normal leading-none tracking-tight text-glow uppercase">
            Gabriel
            <br />
            <span className="text-gray-400 italic font-light text-4xl sm:text-6xl md:text-8xl lowercase">Barclay</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="w-[1px] h-24 sm:h-32 bg-gradient-to-b from-amberGold/50 to-transparent mt-12 sm:mt-16"
        />
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 font-sans text-xs uppercase tracking-[0.2em] text-gray-500"
        >
          Scroll to explore the constellation
        </motion.p>
      </div>
    </section>
  );
}
