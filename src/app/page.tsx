'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MovieList from '@/components/MovieList';
import { Movie, TV } from '@/types';
import movieService from '@/services/movieService';
import { BannerSkeleton, MovieCardSkeleton } from '@/components/Skeletons';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [popularTV, setPopularTV] = useState<TV[]>([]);
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [popularRes, trendingRes, upcomingRes, tvRes] = await Promise.all([
          movieService.getPopularMovies(1),
          movieService.getTrendingMovies(1),
          movieService.getUpcomingMovies(1),
          movieService.getPopularTV(1),
        ]);

        setPopularMovies(popularRes.data.results);
        setTrendingMovies(trendingRes.data.results);
        setUpcomingMovies(upcomingRes.data.results);
        setPopularTV(tvRes.data.results);

        // Set banner with a trending movie
        if (trendingRes.data.results.length > 0) {
          setBannerMovie(trendingRes.data.results[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const bannerImageUrl = bannerMovie?.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${bannerMovie.backdrop_path}`
    : null;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-96 md:h-screen w-full overflow-hidden">
        {isLoading || !bannerImageUrl ? (
          <BannerSkeleton />
        ) : (
          <>
            <Image
              src={bannerImageUrl}
              alt={bannerMovie?.title || 'Banner'}
              fill
              priority
              className="object-cover brightness-50"
              sizes="100vw"
            />
            <div className="gradient-overlay" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-12 container-base">
              <div className="mb-6 md:mb-12">
                <h1 className="text-3xl md:text-6xl font-bold mb-4">
                  {bannerMovie?.title}
                </h1>
                <p className="text-sm md:text-lg max-w-2xl line-clamp-3 mb-6">
                  {bannerMovie?.overview}
                </p>
                <div className="flex gap-4">
                  <Link href={`/movie/${bannerMovie?.id}`} className="btn-primary">
                    ▶ Assistir
                  </Link>
                  <Link href={`/movie/${bannerMovie?.id}`} className="btn-secondary">
                    ℹ Mais Informações
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Content Sections */}
      <div className="container-base py-8">
        <MovieList
          title="Em Alta"
          items={trendingMovies}
          type="movie"
          isLoading={isLoading}
        />

        <MovieList
          title="Filmes Populares"
          items={popularMovies}
          type="movie"
          isLoading={isLoading}
        />

        <MovieList
          title="Próximos Lançamentos"
          items={upcomingMovies}
          type="movie"
          isLoading={isLoading}
        />

        <MovieList
          title="Séries Populares"
          items={popularTV}
          type="tv"
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
