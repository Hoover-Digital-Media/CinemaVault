import { Injectable, signal, computed } from '@angular/core';
import { Movie } from '../models/movie.model';

const STORAGE_KEY = 'cinemavault_watchlist';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly _items = signal<Movie[]>(this.load());

  readonly watchlist = this._items.asReadonly();
  readonly count = computed(() => this._items().length);

  isInWatchlist(movieId: number): boolean {
    return this._items().some(m => m.id === movieId);
  }

  toggle(movie: Movie): void {
    this.isInWatchlist(movie.id) ? this.remove(movie.id) : this.add(movie);
  }

  add(movie: Movie): void {
    this._items.update(list => {
      const updated = [...list, movie];
      this.save(updated);
      return updated;
    });
  }

  remove(movieId: number): void {
    this._items.update(list => {
      const updated = list.filter(m => m.id !== movieId);
      this.save(updated);
      return updated;
    });
  }

  private save(list: Movie[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  private load(): Movie[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Movie[];
    } catch {
      return [];
    }
  }
}
