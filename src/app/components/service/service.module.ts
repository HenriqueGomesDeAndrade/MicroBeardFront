import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
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
    SharedModule,
    ServiceRoutingModule,
  ],
})
export class ServiceModule {}
