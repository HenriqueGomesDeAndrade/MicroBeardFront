import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingCalendarComponent } from './scheduling-calendar/scheduling-calendar.component';
import { SchedulingRoutingModule} from './scheduling-routing.module';



@NgModule({
  declarations: [
  
    SchedulingCalendarComponent
  ],
  imports: [
    SchedulingRoutingModule,
    CommonModule
  ]
})
export class SchedulingModule { }
