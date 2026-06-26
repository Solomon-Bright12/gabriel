'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Painting } from '../lib/data';

interface PaintingCardProps {
  painting: Painting;
  onClick: () => void;
  className?: string;
  isFloating?: boolean;
  floatDelay?: number;
  floatDuration?: number;
}

export default function PaintingCard({
  painting,
  onClick,
  className = '',
  isFloating = true,
  floatDelay = 0,
  floatDuration = 5,
}: PaintingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightColor = painting.accentColor === 'gold' ? 'rgba(212, 175, 55, 0.15)' : 'rgba(138, 3, 3, 0.15)';

  return (
    <motion.div
      className={`relative group cursor-pointer perspective-1000 ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        isFloating
          ? {
              y: [0, -20, 0],
            }
          : {}
      }
      transition={
        isFloating
          ? {
              duration: floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatDelay,
            }
          : {}
      }
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
    >
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-sm bg-void shadow-2xl transition-all duration-500 ease-out transform-gpu"
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px ${spotlightColor}, 0 0 30px ${spotlightColor}`
            : '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        }}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition duration-300 group-hover:opacity-100 z-20 mix-blend-screen"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                ${spotlightColor},
                transparent 80%
              )
            `,
          }}
        />
        <div className="relative w-full h-full aspect-[3/4]">
          <Image
            src={painting.image}
            alt={painting.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110 filter brightness-90 contrast-125 sepia-[0.1]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
         
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        </div>
      </div>
    </motion.div>
  );
}
