import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalServerComponent } from './components/error-pages/internal-server/internal-server.component';
import { UnauthorizedComponent } from './components/error-pages/unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'collaborator', loadChildren: () => import('./components/collaborator/collaborator.module').then(m => m.CollaboratorModule) },
  { path: '401', component: UnauthorizedComponent},
  { path: '404', component: NotFoundComponent }, 
  { path: '500', component: InternalServerComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
