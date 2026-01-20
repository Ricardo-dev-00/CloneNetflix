const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

function getApiKey() {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    console.warn('TMDB_API_KEY is not defined');
    return '';
  }
  return key;
}

export const tmdbClient = {
  // Movies
  getPopularMovies: (page: number = 1) =>
    `${TMDB_BASE_URL}/movie/popular?api_key=${getApiKey()}&page=${page}&language=pt-BR`,
  
  getTrendingMovies: (page: number = 1) =>
    `${TMDB_BASE_URL}/trending/movie/week?api_key=${getApiKey()}&page=${page}&language=pt-BR`,
  
  getUpcomingMovies: (page: number = 1) =>
    `${TMDB_BASE_URL}/movie/upcoming?api_key=${getApiKey()}&page=${page}&language=pt-BR`,
  
  getMovieDetails: (movieId: number) =>
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${getApiKey()}&language=pt-BR&append_to_response=videos,watch/providers,similar`,
  
  searchMovies: (query: string, page: number = 1) =>
    `${TMDB_BASE_URL}/search/movie?api_key=${getApiKey()}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`,
  
  // TV Shows
  getPopularTV: (page: number = 1) =>
    `${TMDB_BASE_URL}/tv/popular?api_key=${getApiKey()}&page=${page}&language=pt-BR`,
  
  getTrendingTV: (page: number = 1) =>
    `${TMDB_BASE_URL}/trending/tv/week?api_key=${getApiKey()}&page=${page}&language=pt-BR`,
  
  getTopRatedTV: (page: number = 1) =>
    `${TMDB_BASE_URL}/tv/top_rated?api_key=${getApiKey()}&page=${page}&language=pt-BR`,
  
  getTVDetails: (tvId: number) =>
    `${TMDB_BASE_URL}/tv/${tvId}?api_key=${getApiKey()}&language=pt-BR&append_to_response=videos,watch/providers,similar`,
  
  searchTV: (query: string, page: number = 1) =>
    `${TMDB_BASE_URL}/search/tv?api_key=${getApiKey()}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`,
  
  // Genres
  getGenres: (type: 'movie' | 'tv') =>
    `${TMDB_BASE_URL}/genre/${type}/list?api_key=${getApiKey()}&language=pt-BR`,
  
  getByGenre: (type: 'movie' | 'tv', genreId: number, page: number = 1) =>
    `${TMDB_BASE_URL}/discover/${type}?api_key=${getApiKey()}&with_genres=${genreId}&page=${page}&language=pt-BR&sort_by=popularity.desc`,
};
