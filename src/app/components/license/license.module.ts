import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseDetailsComponent } from './license-details/license-details.component';
import { LicenseCreateComponent } from './license-create/license-create.component';
import { LicenseUpdateComponent } from './license-update/license-update.component';
import { LicenseDeleteComponent } from './license-delete/license-delete.component';
import { LicenseCollaboratorsComponent } from './license-details/license-collaborators/license-collaborators.component';

@NgModule({
  declarations: [
    LicenseListComponent,
    LicenseDetailsComponent,
    LicenseCreateComponent,
    LicenseUpdateComponent,
    LicenseDeleteComponent,
    LicenseCollaboratorsComponent,
  ],
  imports: [
    SharedModule,
    LicenseRoutingModule,
  ],
})
export class LicenseModule {}
