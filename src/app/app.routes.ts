import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Explorador de Países | Home'  
    },
    {
        path: 'country/:id',
        loadComponent: () => import('./features/country-detail/country-detail.component').then(m => m.CountryDetailComponent),
        title: 'Detalhes do País'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: '404 | Destino Não Encontrado'
    }
];
