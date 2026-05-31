import { Component, inject, signal, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie.model';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-home',
  imports: [MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly movieService = inject(MovieService);

  trending = signal<Movie[]>([]);
  popular = signal<Movie[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.movieService.getTrending().subscribe({
      next: res => {
        this.trending.set(res.results.slice(0, 10));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load movies. Check your TMDb API key in tmdb.config.ts.');
        this.loading.set(false);
      },
    });

    this.movieService.getPopular().subscribe({
      next: res => this.popular.set(res.results.slice(0, 10)),
    });
  }
}
