import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit, AfterViewInit, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Options } from '@popperjs/core/lib/modifiers/computeStyles';
import { SchedulingRepositoryService } from 'src/app/shared/services/repositories/scheduling-repository.service';
import { Scheduling } from 'src/app/interfaces/scheduling/scheduling.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';




const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'scheduling-calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }

      i {
        margin-right: 5px;
      }
    `,
  ],
  templateUrl: './scheduling-calendar.component.html',
})
export class SchedulingCalendarComponent implements OnInit, AfterViewInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
  errorMessage: string = '';
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;


  constructor(private modal: NgbModal,
                private repository: SchedulingRepositoryService,
                private errorHandler: ErrorHandlerService,
                private router: Router,
                private datePipe: DatePipe,) {}

  ngOnInit(): void {
    this.getAllSchedulings();    
  }

  ngAfterViewInit(): void {
    this.refreshView();                                                                             
  }

  ngAfterViewChecked(): void {
    this.refreshView();   
  }


  private getAllSchedulings = () => {
    const apiAddress: string = 'Scheduling';
    this.repository.getSchedulings(apiAddress)
    .subscribe({
      next: (schedulings: Scheduling[]) => {
        schedulings.forEach(scheduling => {
          this.addEvent(scheduling);
        });
      },
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  addEvent(scheduling: Scheduling): void {
    this.events = [
      ...this.events,
      {
        code: scheduling.code,
        title: `${scheduling.title}   ${this.datePipe.transform(scheduling.date, 'HH:mm', 'UTC-6')} - ${this.datePipe.transform(scheduling.endDate, 'HH:mm', 'UTC-6')}`,
        start: new Date(scheduling.date+'-00:00'),
        end: new Date(scheduling.endDate+'-00:00'),
        cancelled: scheduling.cancelled,
        color: scheduling.cancelled ? colors.red: colors.blue,
        contactCode: scheduling.contactCode,
        serviceCode: scheduling.serviceCode,
        collaboratorCode: scheduling.collaboratorCode,
        actions: this.actions,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
      },
    ];
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="bi bi-pen-fill"></i>',
      a11yLabel: 'Atualizar',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="bi bi-trash3-fill"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
 
  handleEvent(action: string, event: CalendarEvent): void {
    switch(action){
      case 'Clicked':{
        this.router.navigate([`/scheduling/details/${event.code}`])
        break;
      }
      case 'Edited':{
        this.router.navigate([`/scheduling/update/${event.code}`])
        break;
      }
      case 'Deleted':{
        this.router.navigate([`/scheduling/delete/${event.code}`])
        break;
      }
    }
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  refreshView(): void{
    this.refresh.next()
  }
}
