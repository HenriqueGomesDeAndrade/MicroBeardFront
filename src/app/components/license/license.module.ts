import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseRoutingModule } from './license-routing.module';
import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseDetailsComponent } from './license-details/license-details.component';
import { LicenseCreateComponent } from './license-create/license-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LicenseUpdateComponent } from './license-update/license-update.component';
import { LicenseDeleteComponent } from './license-delete/license-delete.component';

@NgModule({
  declarations: [
    LicenseListComponent,
    LicenseDetailsComponent,
    LicenseCreateComponent,
    LicenseUpdateComponent,
    LicenseDeleteComponent,
  ],
  imports: [
    CommonModule,
    LicenseRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ]
})
export class LicenseModule { }
