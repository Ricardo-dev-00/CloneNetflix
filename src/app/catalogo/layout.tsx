import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo - NetflixClone',
  description: 'Explore nosso catálogo completo de filmes e séries. Filtro por gênero, tipo e busca.',
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
