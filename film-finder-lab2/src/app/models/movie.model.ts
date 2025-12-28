export interface MovieSearchResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  isFavorite?: boolean;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  isFavorite?: boolean;
}

export interface Rating {
  Source: string;
  Value: string;
}

export type MediaType = 'movie' | 'series' | 'episode' | 'game' | 'all';

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}