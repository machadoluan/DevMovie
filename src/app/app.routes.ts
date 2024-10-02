import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalisComponent } from './components/detalis/detalis.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];