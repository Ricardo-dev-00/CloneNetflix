'use client';

import { useEffect, useState, useCallback } from 'react';
import MovieCard from '@/components/MovieCard';
import { Movie, TV, Genre } from '@/types';
import movieService from '@/services/movieService';
import { MovieCardSkeleton } from '@/components/Skeletons';

export default function CatalogPage() {
  const [items, setItems] = useState<(Movie | TV)[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedType, setSelectedType] = useState<'movie' | 'tv'>('movie');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = selectedType === 'movie'
          ? await movieService.getMovieGenres()
          : await movieService.getTVGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, [selectedType]);

  // Fetch content based on filters
  const fetchContent = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true);
      let response;

      if (searchQuery) {
        response = selectedType === 'movie'
          ? await movieService.searchMovies(searchQuery, page)
          : await movieService.searchTV(searchQuery, page);
      } else if (selectedGenre) {
        response = await movieService.getByGenre(selectedType, selectedGenre, page);
      } else {
        response = selectedType === 'movie'
          ? await movieService.getPopularMovies(page)
          : await movieService.getPopularTV(page);
      }

      setItems(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedGenre, selectedType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, selectedGenre, searchQuery]);

  useEffect(() => {
    fetchContent(currentPage);
  }, [currentPage, searchQuery, selectedGenre, selectedType, fetchContent]);

  const handleTypeChange = (type: 'movie' | 'tv') => {
    setSelectedType(type);
    setSelectedGenre(null);
    setSearchQuery('');
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="container-base py-8">
      <h1 className="text-4xl font-bold mb-8">Catálogo</h1>

      {/* Filters */}
      <div className="bg-netflix-dark rounded-lg p-6 mb-8">
        {/* Type Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Tipo</h3>
          <div className="flex gap-3">
            <button
              onClick={() => handleTypeChange('movie')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedType === 'movie'
                  ? 'bg-netflix-accent text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Filmes
            </button>
            <button
              onClick={() => handleTypeChange('tv')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedType === 'tv'
                  ? 'bg-netflix-accent text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Séries
            </button>
          </div>
        </div>

        {/* Genre Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Gênero</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            <button
              onClick={() => setSelectedGenre(null)}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                selectedGenre === null
                  ? 'bg-netflix-accent text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Todos
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  selectedGenre === genre.id
                    ? 'bg-netflix-accent text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search Filter */}
        <div>
          <h3 className="font-semibold mb-3">Buscar</h3>
          <form onSubmit={handleSearch}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={`Buscar ${selectedType === 'movie' ? 'filmes' : 'séries'}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix-accent"
              />
              <button
                type="submit"
                className="btn-primary"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => <MovieCardSkeleton key={i} />)
          : items.map((item) => (
              <MovieCard
                key={item.id}
                item={item}
                type={selectedType}
              />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 py-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === 1
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          Anterior
        </button>

        <span className="text-gray-300">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-semibold ${
            currentPage === totalPages
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
