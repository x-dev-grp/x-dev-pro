import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ZitflowPage } from './pages/zitflow/zitflow';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'zitflow', component: ZitflowPage },
  { path: '**', redirectTo: '' }
];
