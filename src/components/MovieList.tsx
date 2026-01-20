'use client';

import { Movie, TV } from '@/types';
import MovieCard from './MovieCard';
import SkeletonLoader from './Skeletons';

interface MovieListProps {
  title: string;
  items: Movie[] | TV[];
  type: 'movie' | 'tv';
  isLoading?: boolean;
}

export default function MovieList({ title, items, type, isLoading = false }: MovieListProps) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <SkeletonLoader key={i} />)
          : items.map((item) => <MovieCard key={item.id} item={item} type={type} />)}
      </div>
    </div>
  );
}
