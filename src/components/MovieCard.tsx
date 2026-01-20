'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie, TV } from '@/types';

interface MovieCardProps {
  item: Movie | TV;
  type: 'movie' | 'tv';
}

export default function MovieCard({ item, type }: MovieCardProps) {
  const title = type === 'movie' ? (item as Movie).title : (item as TV).name;
  const posterPath = item.poster_path;
  const imageUrl = posterPath
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}${posterPath}`
    : '/placeholder.jpg';

  return (
    <Link href={`/${type}/${item.id}`}>
      <div className="card-hover relative h-64 rounded-lg overflow-hidden group cursor-pointer">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:brightness-110 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="gradient-overlay" />

        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-bold text-white text-sm line-clamp-2 mb-2">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-yellow-400 text-xs font-semibold">
              ⭐ {item.vote_average.toFixed(1)}
            </span>
            <span className="text-netflix-accent text-xs">Ver Detalhes →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
