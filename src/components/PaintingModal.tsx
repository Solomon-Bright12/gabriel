'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Painting } from '../lib/data';
import { X } from 'lucide-react';
import { getWhatsAppUrl } from './WhatsAppFloatingButton';

interface PaintingModalProps {
  painting: Painting;
  onClose: () => void;
}

export default function PaintingModal({ painting, onClose }: PaintingModalProps) {
  const accentHex = painting.accentColor === 'gold' ? '#D4AF37' : '#8A0303';
  const accentClass = painting.accentColor === 'gold' ? 'text-amberGold' : 'text-crimson';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-void/95 backdrop-blur-xl"
    >
      <div className="absolute inset-0 noise-overlay"></div>
      
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-50 p-2 text-gray-400 hover:text-white transition-colors"
      >
        <X size={32} strokeWidth={1} />
      </button>

      <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row gap-8 lg:gap-16 items-center justify-center">
        {/* Image Container */}
        <motion.div
          layoutId={`painting-${painting.id}`}
          className="relative w-full md:w-1/2 aspect-[3/4] max-h-[80vh] rounded-sm shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden"
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <Image
            src={painting.image}
            alt={painting.title}
            fill
            className="object-cover filter contrast-125 sepia-[0.1]"
            quality={100}
            priority
          />
        </motion.div>

        {/* Details Container */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col items-start text-left z-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs uppercase tracking-widest border font-sans ${painting.status === 'Available' ? 'border-amberGold/30 text-amberGold bg-amberGold/10' : 'border-gray-600 text-gray-400 bg-gray-900/50'}`}>
              {painting.status}
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-sans">
              {painting.year}
            </span>
          </div>

          <h2 className="font-serif text-4xl lg:text-6xl text-white mb-6 leading-tight">
            {painting.title}
          </h2>

          <div className="space-y-2 mb-8 font-sans text-gray-400 text-sm uppercase tracking-widest font-light">
            <p>{painting.medium}</p>
            <p>{painting.dimensions}</p>
          </div>

          <p className="font-serif text-xl lg:text-2xl text-gray-300 italic mb-10 max-w-lg leading-relaxed">
            "{painting.description}"
          </p>

          <div className="flex items-end gap-8 mt-auto">
            <div className="font-sans">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Valuation</p>
              <p className={`text-3xl font-light ${accentClass}`}>{painting.price}</p>
            </div>
            
            {painting.status === 'Available' && (
              <a
                href={getWhatsAppUrl(painting.title, painting.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-white/20 hover:border-amberGold hover:bg-amberGold/5 transition-all duration-300 font-sans text-sm uppercase tracking-widest group relative overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-amberGold transition-colors">Acquire Work</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
