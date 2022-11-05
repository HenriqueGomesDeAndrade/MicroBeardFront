import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorLicensesComponent } from './collaborator-details/collaborator-licenses/collaborator-licenses.component';
import { CollaboratorCreateComponent } from './collaborator-create/collaborator-create.component';
import { CollaboratorUpdateComponent } from './collaborator-update/collaborator-update.component';
import { CollaboratorDeleteComponent } from './collaborator-delete/collaborator-delete.component';
import { CollaboratorUpdateLicenseComponent } from './collaborator-update/collaborator-update-license/collaborator-update-license.component';

@NgModule({
  declarations: [
    CollaboratorListComponent,
    CollaboratorDetailsComponent,
    CollaboratorLicensesComponent,
    CollaboratorCreateComponent,
    CollaboratorUpdateComponent,
    CollaboratorDeleteComponent,
    CollaboratorUpdateLicenseComponent
  ],
  imports: [
    SharedModule,
    CollaboratorRoutingModule,
  ]
})
export class CollaboratorModule { }
