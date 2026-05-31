import { environment } from '../../environments/environment';

export const TMDB_API_KEY = environment.tmdbApiKey;

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function posterUrl(path: string | null, size = 'w500'): string {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : '/no-poster.svg';
}

export function backdropUrl(path: string | null, size = 'w1280'): string {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : '';
}
