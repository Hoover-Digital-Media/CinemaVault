import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MovieService } from '../../services/movie';
import { Movie, Genre } from '../../models/movie.model';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-browse',
  imports: [ReactiveFormsModule, MovieCard],
  templateUrl: './browse.html',
  styleUrl: './browse.css',
})
export class Browse implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly fb = inject(FormBuilder);

  genres = signal<Genre[]>([]);
  movies = signal<Movie[]>([]);
  loading = signal(true);
  totalPages = signal(1);
  currentPage = signal(1);

  readonly years = Array.from({ length: 30 }, (_, i) => 2025 - i);
  readonly sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'vote_average.desc', label: 'Top Rated' },
    { value: 'release_date.desc', label: 'Newest' },
    { value: 'revenue.desc', label: 'Highest Grossing' },
  ];

  form = this.fb.group({
    genre: [''],
    year: [''],
    sortBy: ['popularity.desc'],
  });

  ngOnInit(): void {
    this.movieService.getGenres().subscribe(genres => this.genres.set(genres));
    this.loadMovies();

    this.form.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage.set(1);
        this.loadMovies();
      });
  }

  loadMovies(): void {
    this.loading.set(true);
    const { genre, year, sortBy } = this.form.value;
    this.movieService
      .discover({
        genre: genre ? Number(genre) : undefined,
        year: year ? Number(year) : undefined,
        sortBy: sortBy ?? 'popularity.desc',
        page: this.currentPage(),
      })
      .subscribe({
        next: res => {
          this.movies.set(res.results);
          this.totalPages.set(Math.min(res.total_pages, 500));
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.loadMovies();
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.loadMovies();
    }
  }
}
