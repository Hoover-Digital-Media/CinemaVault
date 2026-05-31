import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist';

export const watchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);

  if (watchlist.count() > 0) {
    return true;
  }
  return router.createUrlTree(['/browse']);
};
