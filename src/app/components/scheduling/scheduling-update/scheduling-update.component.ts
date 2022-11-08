import { Component, Input, OnInit } from '@angular/core';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Scheduling } from 'src/app/interfaces/scheduling/scheduling.model';
import { SchedulingForUpdate } from 'src/app/interfaces/scheduling/scheduling-update.model';
import { SchedulingRepositoryService } from 'src/app/shared/services/repositories/scheduling-repository.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ServiceRepositoryService } from 'src/app/shared/services/repositories/service-repository.service';
import { Service } from 'src/app/interfaces/service/service.model';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { delay } from 'rxjs';

import * as locales from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';


function defineLocales() {
  for (const locale in locales) {
      defineLocale(locales[locale].abbr, locales[locale]);
  }
}

@Component({
  selector: 'app-scheduling-update',
  templateUrl: './scheduling-update.component.html',
  styleUrls: ['./scheduling-update.component.css']
})
export class SchedulingUpdateComponent implements OnInit {
  scheduling: Scheduling
  schedulingForm: FormGroup;
  bsModalRef?: BsModalRef;
  dateError: boolean = false;

  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();

  constructor(private repository: SchedulingRepositoryService,
              private errorHandler: ErrorHandlerService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modal: BsModalService,
              private localeService: BsLocaleService,
              fb: FormBuilder,
              private serviceRepository: ServiceRepositoryService) { }

  ngOnInit(): void {
    this.schedulingForm = new FormGroup({
      title: new FormControl('', [Validators.maxLength(100)]),
      date: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[]),
      contact: new FormControl('',[Validators.required]),
      service: new FormControl('',[Validators.required]),
      collaborator: new FormControl('',[Validators.required]),
    }, {validators: [dateValidator,  collaboratorValidator()]});

    defineLocales();
    this.localeService.use('pt-br')
    this.getSchedulingByCode();
  }

  private getSchedulingByCode = () => {
    const schedulingCode: string = this.activeRoute.snapshot.params['code'];
    const schedulingByCodeUri: string = `Scheduling/${schedulingCode}`;
    this.repository.getScheduling(schedulingByCodeUri)
    .subscribe({
      next: (sched: Scheduling) => {
        this.scheduling = { ...sched, 
          date: new Date(sched.date+'-00:00'),
          endDate: new Date(sched.endDate+'-00:00')
        };
        if(this.scheduling.service  != null || this.scheduling.service != undefined){
          const apiUrl: string = `Service/${this.scheduling.service.code}`;
          this.serviceRepository.getService(apiUrl)
          .subscribe({
            next: (serv: Service) => {
              this.scheduling.service = serv
              this.schedulingForm.patchValue(this.scheduling);
            }
          })
        }
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
      contactCode: schedulingFormValue.contact.code,
      serviceCode: schedulingFormValue.service.code,
      collaboratorCode: schedulingFormValue.collaborator.code,
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

export const dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const start = control.get('date').value;
  const end = control.get('endDate').value;

  var diff = Math.abs(new Date(start).getTime() - new Date(end).getTime()) / 3600000;

  if(start.value !== null && end.value !== null && start > end ){
    return { dateValid:true, dateErrorMessage: 'A data de encerramento não pode ser menor que a data de início' }
  }
  else if(start.value !== null && end.value !== null && diff > 24){
    return { dateValid: true, dateErrorMessage: 'Não é possível marcar um agendamento com mais de 24 horas de diferença'}
  }
  else {
    return null
  }
}

export  function collaboratorValidator() : ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null  => {

    const collaborator = control.get('collaborator').value;
    const service = control.get('service').value;

    if(service === null || service === undefined || service === ''){
      return {isServiceEmpty: true, errorMessage: "O serviço deve ser preenchido antes do colaborador", unauthorizedService: false}
    } 
    else if (collaborator === null || collaborator === undefined || collaborator === ''){
      return null
    }
    else {
      let isAuthorizedOnService = false;
      if(service.collaborators != null || service.collaborators != undefined){
        service.collaborators.forEach(serviceCollaborator => {
          if(serviceCollaborator.code == collaborator.code){
            isAuthorizedOnService = true;
          }
        });

        if(isAuthorizedOnService == false){
          return {unauthorizedService: true, errorMessage: "Esse colaborador não está autorizado nesse serviço selecionado", isServiceEmpty: false}
        }
      }
    }
  }
}