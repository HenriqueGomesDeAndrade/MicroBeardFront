import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';


@NgModule({
  declarations: [
    CollaboratorListComponent
  ],
  imports: [
    CommonModule,
    CollaboratorRoutingModule
  ]
})
export class CollaboratorModule { }
