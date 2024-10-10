import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'ibge',
        loadComponent: () => import('../../projects/ibge-form/src/app/app.component').then((c) => c.AppComponent)
    }
];
