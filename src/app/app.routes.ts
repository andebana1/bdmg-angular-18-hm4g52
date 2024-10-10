import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ibge',
    },
    {
        path: 'ibge',
        loadComponent: () => import('../teste-tecnico/src/app/app.component').then((c) => c.AppComponent)
    }
];
