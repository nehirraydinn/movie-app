import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { MovieComponent } from './movie/movie';
import { WatchlistComponent } from './watchlist/watchlist';
import { WatchedlistComponent } from './watchedlist/watchedlist';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // default
  { path: 'movie', component: MovieComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'watchedlist', component: WatchedlistComponent },
  { path: 'register', component: RegisterComponent }
];
