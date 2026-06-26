'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen py-32 px-4 sm:px-8 lg:px-24 bg-void flex items-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <span className="font-sans text-xs tracking-[0.3em] text-amberGold uppercase mb-4 block">
            The Artist
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-white mb-8">About Gabriel Barclay</h2>
          <div className="font-sans text-gray-400 text-sm sm:text-base leading-relaxed font-light space-y-6">
            <p>
              Gabriel Barclay's digital illustrations are born from a fascination with perspective, vibrant colors, and deep storytelling. His works explore the boundaries of scale and emotion, utilizing bold shapes and contrasting hues.
            </p>
            <p>
              Each piece is an attempt to capture the weight of a moment. By blending surreal elements with relatable interactions, he creates works that act as visual anchors, inviting viewers into an imaginative yet familiar world.
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[3/4] w-full max-w-md mx-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent z-10" />
          <img 
            src="/images/gabby.jpeg" 
            alt="Studio Details"
            className="w-full h-full rounded-md object-cover scale-105 hover:scale-100 transition-transform duration-1000"
          />
        </motion.div>
      </div>
    </section>
  );
}
