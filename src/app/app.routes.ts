import { Routes } from '@angular/router';
import { DashComponent } from './pages/dash/dash.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'd' },
  {
    path: 'd',
    component: DashComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
    ],
  },
];
