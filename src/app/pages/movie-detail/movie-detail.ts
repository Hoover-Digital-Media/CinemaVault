import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie';
import { WatchlistService } from '../../services/watchlist';
import { MovieDetail as MovieDetailData } from '../../models/movie.model';
import { posterUrl, backdropUrl } from '../../core/tmdb.config';

@Component({
  selector: 'app-movie-detail',
  imports: [],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);
  readonly watchlist = inject(WatchlistService);

  movie = signal<MovieDetailData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  readonly posterUrl = posterUrl;
  readonly backdropUrl = backdropUrl;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getDetail(id).subscribe({
      next: movie => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load movie details.');
        this.loading.set(false);
      },
    });
  }

  get formattedRuntime(): string {
    const runtime = this.movie()?.runtime;
    if (!runtime) return '';
    return `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  }

  get releaseYear(): string {
    return this.movie()?.release_date?.slice(0, 4) ?? '';
  }

  toggleWatchlist(): void {
    const m = this.movie();
    if (!m) return;
    this.watchlist.toggle(m);
  }
}
