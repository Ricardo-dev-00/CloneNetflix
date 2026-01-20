'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TVDetails as TVDetailsType } from '@/types';
import movieService from '@/services/movieService';
import MovieList from './MovieList';
import { BannerSkeleton } from './Skeletons';

interface TVDetailsProps {
  tvId: number;
}

export default function TVDetails({ tvId }: TVDetailsProps) {
  const [tv, setTV] = useState<TVDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTVDetails = async () => {
      try {
        setIsLoading(true);
        const response = await movieService.getTVDetails(tvId);
        setTV(response.data);
      } catch (error) {
        console.error('Error fetching TV details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVDetails();
  }, [tvId]);

  if (isLoading) {
    return <BannerSkeleton />;
  }

  if (!tv) {
    return (
      <div className="container-base py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Série não encontrada</h1>
        <Link href="/catalogo" className="btn-primary">
          Voltar ao catálogo
        </Link>
      </div>
    );
  }

  const backdropUrl = tv.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${tv.backdrop_path}`
    : null;

  const posterUrl = tv.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${tv.poster_path}`
    : null;

  const youtubeTrailer = tv.videos?.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  return (
    <>
      {/* Hero Banner */}
      {backdropUrl && (
        <section className="relative h-96 md:h-screen w-full overflow-hidden">
          <Image
            src={backdropUrl}
            alt={tv.name}
            fill
            priority
            className="object-cover brightness-50"
            sizes="100vw"
          />
          <div className="gradient-overlay" />
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-12 container-base">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-6xl font-bold mb-4">{tv.name}</h1>
              <div className="flex gap-4 mb-6 flex-wrap">
                <span className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded">
                  ⭐ {tv.vote_average.toFixed(1)}/10
                </span>
                <span className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded">
                  📺 {tv.number_of_seasons} Temporada{tv.number_of_seasons !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded">
                  🎬 {tv.number_of_episodes} Episódios
                </span>
                {tv.first_air_date && (
                  <span className="flex items-center gap-2 bg-black bg-opacity-50 px-3 py-1 rounded">
                    📅 {new Date(tv.first_air_date).getFullYear()}
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
                alt={tv.name}
                width={300}
                height={450}
                className="w-full rounded-lg mb-6 shadow-lg"
              />
            )}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-400 mb-2">Gêneros</h3>
                <div className="flex flex-wrap gap-2">
                  {tv.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-netflix-accent text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              {tv.created_by.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-400 mb-2">Criadores</h3>
                  <div className="space-y-1">
                    {tv.created_by.slice(0, 3).map((creator) => (
                      <p key={creator.id} className="text-sm">
                        {creator.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {tv.networks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-400 mb-2">Redes</h3>
                  <div className="space-y-1">
                    {tv.networks.slice(0, 3).map((network) => (
                      <p key={network.id} className="text-sm">
                        {network.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {tv.production_companies.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm text-gray-400 mb-2">Produtoras</h3>
                  <div className="space-y-1">
                    {tv.production_companies.slice(0, 3).map((company) => (
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
            {tv.tagline && (
              <div>
                <p className="text-2xl italic text-netflix-accent">
                  &quot;{tv.tagline}&quot;
                </p>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold mb-4">Sinopse</h2>
              <p className="text-gray-300 leading-relaxed">{tv.overview}</p>
            </div>

            {tv.spoken_languages.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Idiomas</h3>
                <div className="flex flex-wrap gap-2">
                  {tv.spoken_languages.map((lang) => (
                    <span key={lang.iso_639_1} className="text-gray-300">
                      {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tv.production_countries.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3">Países de Origem</h3>
                <div className="flex flex-wrap gap-2">
                  {tv.production_countries.map((country) => (
                    <span key={country.iso_3166_1} className="text-gray-300">
                      {country.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {tv.last_episode_to_air && (
              <div>
                <h3 className="text-xl font-bold mb-3">Último Episódio</h3>
                <p className="text-gray-300">
                  Temporada {tv.last_episode_to_air.season_number}, Episódio{' '}
                  {tv.last_episode_to_air.episode_number}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(tv.last_episode_to_air.air_date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar TV Shows */}
      {tv.similar && tv.similar.results.length > 0 && (
        <div className="container-base py-8">
          <MovieList
            title="Séries Similares"
            items={tv.similar.results}
            type="tv"
          />
        </div>
      )}
    </>
  );
}
