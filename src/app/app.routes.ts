import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: 'home', loadComponent: () => import('./pages/components/home/home').then(m => m.Home) },
    {path: 'tower', loadComponent: () => import('./pages/components/tower/tower').then(m => m.Tower) },
    {path: 'vr', loadComponent: () => import('./pages/components/vr/vr').then(m => m.Vr) },
    {path: 'welcome', loadComponent: () => import('./pages/components/welcome/welcome').then(m => m.Welcome) },

];
