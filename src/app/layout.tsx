import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NetflixClone - Streaming de Filmes e Séries',
  description: 'Explore um catálogo completo de filmes e séries. Clone da Netflix construído com Next.js, React e TypeScript.',
  keywords: 'filmes, séries, streaming, clone netflix, catálogo',
  openGraph: {
    title: 'NetflixClone - Streaming de Filmes e Séries',
    description: 'Explore um catálogo completo de filmes e séries',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#e50914" />
      </head>
      <body className="bg-netflix-black text-white">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
