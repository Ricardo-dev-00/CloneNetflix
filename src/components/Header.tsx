'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="container-base py-4 flex justify-between items-center">
        <Link href="/" className="text-netflix-accent font-bold text-2xl">
          NetflixClone
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-netflix-accent transition-colors">
            Início
          </Link>
          <Link href="/catalogo" className="hover:text-netflix-accent transition-colors">
            Catálogo
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-black border-t border-gray-700 py-4">
          <div className="container-base flex flex-col gap-4">
            <Link href="/" className="hover:text-netflix-accent transition-colors">
              Início
            </Link>
            <Link href="/catalogo" className="hover:text-netflix-accent transition-colors">
              Catálogo
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
