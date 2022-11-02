import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorCreateComponent } from './collaborator-create/collaborator-create.component';

const routes: Routes = [
  {path: 'list', component: CollaboratorListComponent},
  {path: 'details/:id', component: CollaboratorDetailsComponent},
  { path: 'create', component: CollaboratorCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorRoutingModule { }
