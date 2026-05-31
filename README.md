# CinemaVault

A movie catalog SPA built with Angular 21. Browse popular and trending films, search by title, explore full movie details, and save a personal watchlist — all powered by the [TMDb API](https://www.themoviedb.org/).

Built as the capstone project for the **Angular Foundations** course on [Hoover Digital Media](https://learn.hooverdigitalmedia.com).

## Features

- **Home** — trending this week and popular now
- **Browse** — filter by genre, year, and sort order with reactive forms
- **Search** — live search with `switchMap` to cancel in-flight requests
- **Movie detail** — backdrop, cast, runtime, genres, and ratings
- **Watchlist** — save movies to localStorage; route guard redirects when empty

## Tech stack

- Angular 21 (standalone components, `@if`/`@for` control flow)
- RxJS — `switchMap`, `debounceTime`, `distinctUntilChanged`
- Angular Signals — `signal()`, `computed()` for reactive state
- Angular Router — route params, `RouterLink`, `CanActivateFn` guard
- Angular Reactive Forms — `FormBuilder`, `FormGroup`, `FormControl`
- `HttpClient` + TMDb API

## Local development

**Prerequisites:** Node 20+, Angular CLI 21+

```bash
git clone https://github.com/Hoover-Digital-Media/CinemaVault.git
cd CinemaVault
npm install
```

Get a free API key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api), then:

```bash
cp src/environments/environment.ts src/environments/environment.local.ts
```

Edit `environment.local.ts` and add your key:

```ts
export const environment = {
  tmdbApiKey: 'your_key_here',
};
```

Start the dev server:

```bash
npm run start:local
```

Open [http://localhost:4200](http://localhost:4200).

## Deployment

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`.

Add your TMDb API key as a repository secret named `TMDB_API_KEY` under **Settings → Secrets and variables → Actions**.
