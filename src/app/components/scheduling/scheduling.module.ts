import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingCalendarComponent } from './scheduling-calendar/scheduling-calendar.component';
import { SchedulingRoutingModule} from './scheduling-routing.module';

import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



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
  declarations: [SchedulingCalendarComponent],
  exports: [SchedulingCalendarComponent],
})
export class SchedulingModule { }
