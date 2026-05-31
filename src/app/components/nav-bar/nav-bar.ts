import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private readonly router = inject(Router);
  readonly watchlist = inject(WatchlistService);

  query = signal('');

  onSearch(q: string): void {
    const trimmed = q.trim();
    if (trimmed) {
      this.router.navigate(['/search'], { queryParams: { q: trimmed } });
      this.query.set('');
    }
  }
}
