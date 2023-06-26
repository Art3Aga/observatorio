import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FiltroComponent } from './pages/filtro/filtro.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'filtro', component: FiltroComponent },
  { path: '**', redirectTo: 'home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
