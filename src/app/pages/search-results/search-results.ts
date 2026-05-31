import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie.model';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-search-results',
  imports: [MovieCard],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly movieService = inject(MovieService);

  query = signal('');
  movies = signal<Movie[]>([]);
  totalResults = signal(0);
  loading = signal(false);

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map(params => params.get('q') ?? ''),
        distinctUntilChanged(),
        switchMap(q => {
          this.query.set(q);
          if (!q.trim()) {
            this.movies.set([]);
            this.totalResults.set(0);
            return EMPTY;
          }
          this.loading.set(true);
          return this.movieService.search(q);
        })
      )
      .subscribe({
        next: res => {
          this.movies.set(res.results);
          this.totalResults.set(res.total_results);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }
}
