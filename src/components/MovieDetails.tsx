'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MovieDetails as MovieDetailsType } from '@/types';
import movieService from '@/services/movieService';
import MovieList from './MovieList';
import { BannerSkeleton } from './Skeletons';

interface MovieDetailsProps {
  movieId: number;
}

export default function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await movieService.getMovieDetails(movieId);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <BannerSkeleton />;
  }

  if (!movie) {
    return (
      <div className="container-base py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Filme não encontrado</h1>
        <Link href="/catalogo" className="btn-primary">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const youtubeTrailer = movie.videos?.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  return (
    <>
      {/* Hero Banner */}
      {backdropUrl && (
        <section className="relative h-96 md:h-screen w-full overflow-hidden">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            priority
            className="object-cover brightness-50"
            sizes="100vw"
          />
          <div className="gradient-overlay" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-12 container-base">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-6xl font-bold mb-4">{movie.title}</h1>
              <div className="flex gap-4 mb-6 flex-wrap">
                <span className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded">
                  ⭐ {movie.vote_average.toFixed(1)}/10
                </span>
                {movie.runtime > 0 && (
                  <span className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded">
                    ⏱️ {movie.runtime}min
                  </span>
                )}
                {movie.release_date && (
                  <span className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded">
                    📅 {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                {youtubeTrailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${youtubeTrailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    ▶ Assistir Trailer
                  </a>
                )}
                <Link href="/catalogo" className="btn-secondary">
                  ← Voltar
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <div className="container-base py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Poster and Info */}
          <div className="md:col-span-1">
            {posterUrl && (
              <Image
                src={posterUrl}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full rounded-lg mb-6 shadow-lg"
              />
            )}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-400 mb-2">Gêneros</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-netflix-accent text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              {movie.budget > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-400 mb-2">Orçamento</h3>
                  <p className="text-lg">
                    ${(movie.budget / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-400 mb-2">Receita</h3>
                  <p className="text-lg">
                    ${(movie.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              )}
              {movie.production_companies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-400 mb-2">Produtoras</h3>
                  <div className="space-y-1">
                    {movie.production_companies.slice(0, 3).map((company) => (
                      <p key={company.id} className="text-sm">
                        {company.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="md:col-span-3 space-y-8">
            {movie.tagline && (
              <div>
                <p className="text-2xl italic text-netflix-accent">
                  &quot;{movie.tagline}&quot;
                </p>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-4">Sinopse</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {movie.spoken_languages.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.spoken_languages.map((lang) => (
                    <span key={lang.iso_639_1} className="text-gray-300">
                      {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.production_countries.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Países de Origem</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.production_countries.map((country) => (
                    <span key={country.iso_3166_1} className="text-gray-300">
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {movie.similar && movie.similar.results.length > 0 && (
        <div className="container-base py-8">
          <MovieList
            title="Filmes Similares"
            items={movie.similar.results}
            type="movie"
          />
        </div>
      )}
    </>
  );
}
