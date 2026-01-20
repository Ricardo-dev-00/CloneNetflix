import type { Metadata } from 'next';
import MovieDetails from '@/components/MovieDetails';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  
  // Fetch movie details on the server side
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
  
  try {
    const response = await fetch(`${baseUrl}/movies/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      return {
        title: 'Filme não encontrado',
        description: 'O filme que você está procurando não foi encontrado.',
      };
    }

    const movie = await response.json();

    return {
      title: `${movie.title} - NetflixClone`,
      description: movie.overview || 'Assista a este filme em NetflixClone',
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.poster_path
          ? [`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.poster_path}`]
          : [],
        type: 'video.movie',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Filme - NetflixClone',
    };
  }
}

export default async function MoviePage({ params }: Props) {
  const id = (await params).id;
  return <MovieDetails movieId={parseInt(id)} />;
}
