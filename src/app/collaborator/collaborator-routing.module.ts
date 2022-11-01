import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';

const routes: Routes = [
  {path: 'list', component: CollaboratorListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaboratorRoutingModule { }
