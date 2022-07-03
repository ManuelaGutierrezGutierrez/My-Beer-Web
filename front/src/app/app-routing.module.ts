import { HomeComponent } from './pages/home/home.component';
import { BeersComponent } from './pages/beers/beers.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionComponent } from './pages/gestion/gestion.component';

const routes: Routes = [
  {
    path: 'beers',
    component: BeersComponent,
  },
  {
    path: 'gestion',
    component: GestionComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
