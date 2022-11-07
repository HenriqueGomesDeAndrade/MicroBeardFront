import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { CollaboratorListComponent } from './collaborator-list/collaborator-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorLicensesComponent } from './collaborator-details/collaborator-licenses/collaborator-licenses.component';
import { CollaboratorCreateComponent } from './collaborator-create/collaborator-create.component';
import { CollaboratorUpdateComponent } from './collaborator-update/collaborator-update.component';
import { CollaboratorDeleteComponent } from './collaborator-delete/collaborator-delete.component';
import { CollaboratorManageLicenseComponent } from './collaborator-manage-license/collaborator-manage-license.component';
import { FormsModule } from '@angular/forms';
import { CollaboratorServiceComponent } from './collaborator-details/collaborator-service/collaborator-service.component';
import { CollaboratorManageServiceComponent } from './collaborator-manage-service/collaborator-manage-service.component';

@NgModule({
  declarations: [
    CollaboratorListComponent,
    CollaboratorDetailsComponent,
    CollaboratorLicensesComponent,
    CollaboratorCreateComponent,
    CollaboratorUpdateComponent,
    CollaboratorDeleteComponent,
    CollaboratorManageLicenseComponent,
    CollaboratorServiceComponent,
    CollaboratorManageServiceComponent,
  ],
  imports: [
    SharedModule,
    CollaboratorRoutingModule,
    FormsModule
  ]
})
export class CollaboratorModule { }
