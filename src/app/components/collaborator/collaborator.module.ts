import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorLicensesComponent } from './collaborator-details/collaborator-licenses/collaborator-licenses.component';
import { CollaboratorCreateComponent } from './collaborator-create/collaborator-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollaboratorUpdateComponent } from './collaborator-update/collaborator-update.component';
import { CollaboratorDeleteComponent } from './collaborator-delete/collaborator-delete.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    CollaboratorListComponent,
    CollaboratorDetailsComponent,
    CollaboratorLicensesComponent,
    CollaboratorCreateComponent,
    CollaboratorUpdateComponent,
    CollaboratorDeleteComponent
  ],
  imports: [
    CommonModule,
    CollaboratorRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxMaskModule.forChild(),
  ]
})
export class CollaboratorModule { }
