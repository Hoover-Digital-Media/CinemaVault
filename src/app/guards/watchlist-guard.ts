import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist';
import { ToastService } from '../services/toast';

export const watchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);
  const toast = inject(ToastService);

  if (watchlist.count() > 0) {
    return true;
  }
  toast.show('Add a movie to your watchlist first.');
  return router.createUrlTree(['/browse']);
};
