import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingCalendarComponent } from './scheduling-calendar/scheduling-calendar.component';
import { SchedulingRoutingModule} from './scheduling-routing.module';

import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SchedulingCreateComponent } from './scheduling-create/scheduling-create.component';
import { SchedulingUpdateComponent } from './scheduling-update/scheduling-update.component';
import { SchedulingDetailsComponent } from './scheduling-details/scheduling-details.component';
import { SchedulingDeleteComponent } from './scheduling-delete/scheduling-delete.component';



@NgModule({
  imports: [
    SchedulingRoutingModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [SchedulingCalendarComponent, SchedulingCreateComponent, SchedulingUpdateComponent, SchedulingDetailsComponent, SchedulingDeleteComponent],
  exports: [SchedulingCalendarComponent],
})
export class SchedulingModule { }
