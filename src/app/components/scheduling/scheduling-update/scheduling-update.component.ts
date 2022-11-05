import { Component, OnInit } from '@angular/core';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Scheduling } from 'src/app/interfaces/scheduling/scheduling.model';
import { SchedulingForUpdate } from 'src/app/interfaces/scheduling/scheduling-update.model';
import { SchedulingRepositoryService } from 'src/app/shared/services/repositories/scheduling-repository.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-scheduling-update',
  templateUrl: './scheduling-update.component.html',
  styleUrls: ['./scheduling-update.component.css']
})
export class SchedulingUpdateComponent implements OnInit {
  scheduling: Scheduling
  schedulingForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: SchedulingRepositoryService,
              private errorHandler: ErrorHandlerService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modal: BsModalService,
              private localeService: BsLocaleService) { }

  ngOnInit(): void {
    this.schedulingForm = new FormGroup({
      title: new FormControl('', [Validators.maxLength(100)]),
      date: new FormControl('',[Validators.required]),
      endDate: new FormControl(''),
      contactCode: new FormControl('',[Validators.required, Validators.min(0)]),
      serviceCode: new FormControl('',[Validators.required, Validators.min(0)]),
      collaboratorCode: new FormControl('',[Validators.required, Validators.min(0)]),
    });

    this.localeService.use('pt-br')
    this.getSchedulingByCode();
  }

  private getSchedulingByCode = () => {
    const schedulingCode: string = this.activeRoute.snapshot.params['code'];
    const schedulingByCodeUri: string = `Scheduling/${schedulingCode}`;
    this.repository.getScheduling(schedulingByCodeUri)
    .subscribe({
      next: (collab: Scheduling) => {
        this.scheduling = { ...collab, 
          date: new Date(this.datePipe.transform(collab.date, 'dd/MM/yyyy HH:mm')),
          endDate: collab.endDate ? new Date(this.datePipe.transform(collab.endDate, 'dd/MM/yyyy HH:mm')) : null,
        };
        this.schedulingForm.patchValue(this.scheduling);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  validateControl = (controlName: string) => {
    if (this.schedulingForm.get(controlName).invalid && this.schedulingForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  
  hasError = (controlName: string, errorName: string) => {
    if (this.schedulingForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  public updateScheduling = (schedulingFormValue) => {
    if(this.schedulingForm.valid)
      this.executeSchedulingUpdate(schedulingFormValue)
  }

  private executeSchedulingUpdate = (schedulingFormValue) => {
    const schedulingForUpd: SchedulingForUpdate = {
      title: schedulingFormValue.title,
      date: schedulingFormValue.date,
      endDate: schedulingFormValue.endDate,
      contactCode: schedulingFormValue.contactCode,
      serviceCode: schedulingFormValue.serviceCode,
      collaboratorCode: schedulingFormValue.collaboratorCode,
    }

    const apiUri: string = `Scheduling/${this.scheduling.code}`;

    this.repository.updateScheduling(apiUri, schedulingForUpd)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Mensagem de sucesso',
            modalBodyText: 'Agendamento atualizado com sucesso',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToSchedulingList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  public redirectToSchedulingList = () => {
    this.router.navigate(['/scheduling/calendar'])
  }
}
