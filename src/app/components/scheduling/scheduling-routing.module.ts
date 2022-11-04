import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulingCalendarComponent } from './scheduling-calendar/scheduling-calendar.component';


const routes: Routes = [
  { path: 'calendar', component: SchedulingCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingRoutingModule { }
