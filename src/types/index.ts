export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  media_type?: string;
}

export interface TV {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  media_type?: string;
}

export interface MovieDetails extends Movie {
  budget: number;
  genres: Array<{ id: number; name: string }>;
  production_companies: Array<{ id: number; name: string; logo_path: string | null }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: string;
  tagline: string;
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  watch_providers?: {
    results: {
      [key: string]: {
        buy?: Array<{ provider_id: number; provider_name: string }>;
        rent?: Array<{ provider_id: number; provider_name: string }>;
        flatrate?: Array<{ provider_id: number; provider_name: string }>;
      };
    };
  };
  similar?: {
    results: Movie[];
  };
}

export interface TVDetails extends TV {
  created_by: Array<{ id: number; name: string }>;
  episode_run_time: number[];
  genres: Array<{ id: number; name: string }>;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  networks: Array<{ id: number; logo_path: string | null; name: string; origin_country: string }>;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Array<{ id: number; name: string; logo_path: string | null }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  spoken_languages: Array<{ iso_639_1: string; name: string }>;
  status: string;
  tagline: string;
  type: string;
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  watch_providers?: {
    results: {
      [key: string]: {
        buy?: Array<{ provider_id: number; provider_name: string }>;
        rent?: Array<{ provider_id: number; provider_name: string }>;
        flatrate?: Array<{ provider_id: number; provider_name: string }>;
      };
    };
  };
  similar?: {
    results: TV[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface APIResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
