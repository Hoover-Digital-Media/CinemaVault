export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  original_language: string;
  popularity: number;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string;
  status: string;
  revenue: number;
  budget: number;
  homepage: string | null;
  imdb_id: string | null;
  credits?: {
    cast: CastMember[];
    crew: CrewMember[];
  };
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
