'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-700 mt-16">
      <div className="container-base py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-netflix-accent">NetflixClone</h3>
            <p className="text-gray-400 text-sm">
              Um clone da Netflix criado com Next.js, TypeScript e Tailwind CSS para demonstrar boas práticas modernas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tecnologias</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Next.js 14</li>
              <li>React 18</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  TMDB API
                </a>
              </li>
              <li>
                <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Next.js Docs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 NetflixClone. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
