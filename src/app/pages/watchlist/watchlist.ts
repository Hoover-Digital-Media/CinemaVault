import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-watchlist',
  imports: [MovieCard, RouterLink],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})
export class Watchlist {
  readonly watchlist = inject(WatchlistService);
}
