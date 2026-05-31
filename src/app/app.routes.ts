import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Browse } from './pages/browse/browse';
import { SearchResults } from './pages/search-results/search-results';
import { MovieDetail } from './pages/movie-detail/movie-detail';
import { Watchlist } from './pages/watchlist/watchlist';
import { watchlistGuard } from './guards/watchlist-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'browse', component: Browse },
  { path: 'search', component: SearchResults },
  { path: 'movies/:id', component: MovieDetail },
  { path: 'watchlist', component: Watchlist, canActivate: [watchlistGuard] },
  { path: '**', redirectTo: '' },
];
