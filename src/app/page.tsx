import React from 'react';
import CanvasNoise from '../components/CanvasNoise';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import About from '../components/About';
import Contact from '../components/Contact';
import WhatsAppFloatingButton from '../components/WhatsAppFloatingButton';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-void text-gray-200">
      <CanvasNoise />
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Gallery />
      <Contact />
      <WhatsAppFloatingButton />
      
      {/* Minimalist Footer */}
      <footer className="w-full py-12 text-center border-t border-white/5 bg-void relative z-10">
        <p className="font-sans text-xs text-gray-600 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Gabriel Barclay. All Rights Reserved.
        </p>
      </footer>
    </main>
  );
}
