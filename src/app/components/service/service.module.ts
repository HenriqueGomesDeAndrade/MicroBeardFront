import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ServiceUpdateComponent } from './service-update/service-update.component';
import { ServiceDeleteComponent } from './service-delete/service-delete.component';

@NgModule({
  declarations: [
    ServiceListComponent,
    ServiceDetailsComponent,
    ServiceCreateComponent,
    ServiceUpdateComponent,
    ServiceDeleteComponent,
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ]
})
export class ServiceModule { }
