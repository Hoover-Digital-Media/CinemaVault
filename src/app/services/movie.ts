import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie, MovieDetail, MoviesResponse, Genre } from '../models/movie.model';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../core/tmdb.config';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);

  private params(extra: Record<string, string> = {}): HttpParams {
    return new HttpParams({ fromObject: { api_key: TMDB_API_KEY, ...extra } });
  }

  getPopular(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${TMDB_BASE_URL}/movie/popular`, {
      params: this.params({ page: String(page) }),
    });
  }

  getTopRated(page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${TMDB_BASE_URL}/movie/top_rated`, {
      params: this.params({ page: String(page) }),
    });
  }

  getTrending(): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: this.params(),
    });
  }

  getDetail(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${TMDB_BASE_URL}/movie/${id}`, {
      params: this.params({ append_to_response: 'credits' }),
    });
  }

  search(query: string, page = 1): Observable<MoviesResponse> {
    return this.http.get<MoviesResponse>(`${TMDB_BASE_URL}/search/movie`, {
      params: this.params({ query, page: String(page) }),
    });
  }

  discover(opts: { genre?: number; year?: number; sortBy?: string; page?: number } = {}): Observable<MoviesResponse> {
    const extra: Record<string, string> = {};
    if (opts.genre) extra['with_genres'] = String(opts.genre);
    if (opts.year) extra['primary_release_year'] = String(opts.year);
    if (opts.sortBy) extra['sort_by'] = opts.sortBy;
    extra['page'] = String(opts.page ?? 1);
    return this.http.get<MoviesResponse>(`${TMDB_BASE_URL}/discover/movie`, {
      params: this.params(extra),
    });
  }

  getGenres(): Observable<Genre[]> {
    return this.http
      .get<{ genres: Genre[] }>(`${TMDB_BASE_URL}/genre/movie/list`, {
        params: this.params(),
      })
      .pipe(map(r => r.genres));
  }
}
