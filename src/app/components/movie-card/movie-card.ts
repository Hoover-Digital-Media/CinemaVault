import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { WatchlistService } from '../../services/watchlist';
import { posterUrl } from '../../core/tmdb.config';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input({ required: true }) movie!: Movie;

  readonly watchlist = inject(WatchlistService);
  readonly posterUrl = posterUrl;

  get rating(): string {
    return this.movie.vote_average.toFixed(1);
  }

  get year(): string {
    return this.movie.release_date?.slice(0, 4) ?? '';
  }

  toggleWatchlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.watchlist.toggle(this.movie);
  }
}
