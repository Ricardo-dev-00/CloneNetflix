import axios from 'axios';
import { APIResponse, Movie, TV, MovieDetails, TVDetails, Genre } from '@/types';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Accept-Encoding': 'gzip, deflate',
  },
});

export const movieService = {
  // Movies
  getPopularMovies: (page: number = 1) =>
    apiClient.get<APIResponse<Movie>>('/movies/popular', { params: { page } }),
  
  getTrendingMovies: (page: number = 1) =>
    apiClient.get<APIResponse<Movie>>('/movies/trending', { params: { page } }),
  
  getUpcomingMovies: (page: number = 1) =>
    apiClient.get<APIResponse<Movie>>('/movies/upcoming', { params: { page } }),
  
  getMovieDetails: (id: number) =>
    apiClient.get<MovieDetails>(`/movies/${id}`),
  
  searchMovies: (query: string, page: number = 1) =>
    apiClient.get<APIResponse<Movie>>('/search/movies', { params: { query, page } }),
  
  // TV Shows
  getPopularTV: (page: number = 1) =>
    apiClient.get<APIResponse<TV>>('/tv/popular', { params: { page } }),
  
  getTrendingTV: (page: number = 1) =>
    apiClient.get<APIResponse<TV>>('/tv/trending', { params: { page } }),
  
  getTopRatedTV: (page: number = 1) =>
    apiClient.get<APIResponse<TV>>('/tv/top-rated', { params: { page } }),
  
  getTVDetails: (id: number) =>
    apiClient.get<TVDetails>(`/tv/${id}`),
  
  searchTV: (query: string, page: number = 1) =>
    apiClient.get<APIResponse<TV>>('/search/tv', { params: { query, page } }),
  
  // Genres
  getMovieGenres: () =>
    apiClient.get<{ genres: Genre[] }>('/genres/movies'),
  
  getTVGenres: () =>
    apiClient.get<{ genres: Genre[] }>('/genres/tv'),
  
  getByGenre: (type: 'movie' | 'tv', genreId: number, page: number = 1) =>
    apiClient.get<APIResponse<Movie | TV>>('/discover', { params: { type, genreId, page } }),
};

export default movieService;
