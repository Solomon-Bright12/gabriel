'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { paintings, Painting } from '../lib/data';
import PaintingModal from './PaintingModal';

// ─── Gallery Card ──────────────────────────────────────────────────────────────
function GalleryCard({
  painting,
  index,
  onClick,
}: {
  painting: Painting;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState(false);

  const accentHex =
    painting.accentColor === 'gold' ? '#D4AF37' : '#8A0303';
  const accentAlpha =
    painting.accentColor === 'gold'
      ? 'rgba(212,175,55,0.18)'
      : 'rgba(138,3,3,0.18)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer overflow-hidden rounded-sm"
      style={{
        boxShadow: hovered
          ? `0 24px 60px -12px ${accentAlpha}, 0 0 0 1px ${accentHex}22`
          : '0 8px 32px -8px rgba(0,0,0,0.7)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={painting.image}
          alt={painting.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 contrast-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          quality={90}
        />

        {/* Gradient overlay — always present, stronger on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(to top, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.3) 50%, transparent 100%)',
            opacity: hovered ? 1 : 0.65,
          }}
        />

        {/* Accent color top-left corner line */}
        <motion.div
          className="absolute top-0 left-0 w-8 h-px origin-left"
          style={{ backgroundColor: accentHex }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute top-0 left-0 h-8 w-px origin-top"
          style={{ backgroundColor: accentHex }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        />

        {/* Status badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] font-sans font-medium rounded-none ${
              painting.status === 'Available'
                ? 'bg-amberGold/10 border border-amberGold/30 text-amberGold'
                : 'bg-gray-900/50 border border-gray-700/40 text-gray-500'
            }`}
          >
            {painting.status}
          </span>
        </div>

        {/* Bottom text reveal */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <motion.p
            className="font-sans text-[9px] uppercase tracking-[0.22em] mb-1.5"
            style={{ color: accentHex }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.3 }}
          >
            {painting.medium} · {painting.year}
          </motion.p>
          <h3 className="font-serif text-white text-lg sm:text-xl leading-tight">
            {painting.title}
          </h3>
          <motion.p
            className="font-sans text-gray-400 text-[11px] mt-1.5 leading-relaxed line-clamp-2"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {painting.description}
          </motion.p>
          <motion.div
            className="mt-3 flex items-center gap-2"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <span
              className="text-[10px] font-sans uppercase tracking-widest border px-3 py-1"
              style={{ borderColor: `${accentHex}50`, color: accentHex }}
            >
              View Details
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Filter Button ─────────────────────────────────────────────────────────────
function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative font-sans text-[10px] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300 ${
        active ? 'text-amberGold' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="filter-indicator"
          className="absolute inset-0 border border-amberGold/30 bg-amberGold/5"
        />
      )}
    </button>
  );
}

// ─── Main Gallery ──────────────────────────────────────────────────────────────
type Filter = 'all' | 'traditional' | 'digital' | '2024' | '2025' | 'gold' | 'crimson';

export default function Gallery() {
  const [selected, setSelected] = useState<Painting | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = paintings.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'traditional') return p.medium !== 'Digital Art';
    if (filter === 'digital') return p.medium === 'Digital Art';
    if (filter === '2024') return p.year === '2024';
    if (filter === '2025') return p.year === '2025';
    if (filter === 'gold') return p.accentColor === 'gold';
    if (filter === 'crimson') return p.accentColor === 'crimson';
    return true;
  });

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen py-32 px-4 sm:px-8 lg:px-20 bg-void"
    >
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-amberGold/70 mb-4">
            The Atelier · {paintings.length} Works
          </p>

          {/* Title + rule */}
          <div className="flex items-end gap-8 mb-6">
            <h2 className="font-serif text-5xl sm:text-7xl text-white leading-none">
              The Constellation
            </h2>
            <div className="hidden sm:block flex-1 h-px bg-white/8 mb-3" />
          </div>

          <p className="font-sans text-gray-500 text-sm leading-relaxed max-w-xl font-light">
            An exploration of traditional and digital artistry — each piece a portal into
            colour, emotion, and the unseen forces that shape the human
            experience. Select any work to examine it in full and inquire about
            acquisition.
          </p>
        </motion.div>

        {/* ── Filters ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mt-10 border-t border-white/5 pt-6"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-gray-600 mr-2">
            Filter:
          </span>
          {(
            [
              ['all', 'All Works'],
              ['traditional', 'Traditional'],
              ['digital', 'Digital'],
              ['2024', '2024'],
              ['2025', '2025'],
              ['gold', 'Gold Palette'],
              ['crimson', 'Crimson Palette'],
            ] as [Filter, string][]
          ).map(([val, label]) => (
            <FilterBtn
              key={val}
              active={filter === val}
              onClick={() => setFilter(val)}
            >
              {label}
            </FilterBtn>
          ))}

          <span className="ml-auto font-sans text-[10px] text-gray-600 uppercase tracking-widest">
            {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
          </span>
        </motion.div>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
          >
            {filtered.map((painting, i) => (
              <div key={painting.id} className="break-inside-avoid">
                <GalleryCard
                  painting={painting}
                  index={i}
                  onClick={() => setSelected(painting)}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-serif text-3xl text-white/20 mb-3">No works found</p>
            <p className="font-sans text-gray-600 text-sm">
              Try a different filter above.
            </p>
          </div>
        )}
      </div>

      {/* ── Inquiry Modal ── */}
      <AnimatePresence>
        {selected && (
          <PaintingModal
            painting={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
