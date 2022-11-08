import { Component, OnInit } from '@angular/core';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { CollaboratorRepositoryService } from 'src/app/shared/services/repositories/collaborator-repository.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { CollaboratorForCreation } from 'src/app/interfaces/collaborator/collaborator-create.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { License } from 'src/app/interfaces/license/license.model';
import { Service } from 'src/app/interfaces/service/service.model';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.css']
})
export class CollaboratorCreateComponent implements OnInit {
  licenses: License[] = [];
  services: Service[] = [];
  errorMessage: string = '';
  collaboratorForm: FormGroup;
  bsModalRef?: BsModalRef;
  role: string;

  constructor(private repository: CollaboratorRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private datePipe: DatePipe,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.collaboratorForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      birthDate: new FormControl(''),
      cpf: new FormControl('',[Validators.minLength(13), Validators.maxLength(14)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      phone: new FormControl('',[Validators.maxLength(15), Validators.pattern("(\\(?\\d{2}\\)?\\s?)?(9?\\d{4}\\-?\\d{4})")]),
      function: new FormControl('',[Validators.maxLength(100)]),
      salary: new FormControl('',[Validators.min(0), Validators.max(999999.99)]),
      commision: new FormControl('',[Validators.min(0), Validators.max(999999.99)]),
      isAdmin: new FormControl('',[]),
      services: new FormControl('', []),
      licenses: new FormControl('', []),
    }, {validators: servicesValidator});

    this.collaboratorForm.get('licenses').setValue([])
    this.collaboratorForm.get('services').setValue([])

    this.role = localStorage.getItem('userRole');
  }

  ngAfterContentChecked(): void {
    this.role !== 'Collaborator' 
    ? null
    : this.router.navigate(['collaborator/list']);
  }

  validateControl = (controlName: string) => {
    if (this.collaboratorForm.get(controlName).invalid && this.collaboratorForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  
  hasError = (controlName: string, errorName: string) => {
    if (this.collaboratorForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createCollaborator = (collaboratorFormValue) => {
    if(this.collaboratorForm.valid)
      this.executeCollaboratorCreation(collaboratorFormValue);
  }

  getCpf(cpf: string): string{
    return cpf.replace(/[.-]/g, "");
  }

  private executeCollaboratorCreation = (collaboratorFormValue) => {
    const collaborator: CollaboratorForCreation = {
      name: collaboratorFormValue.name,
      birthDate: this.datePipe.transform(collaboratorFormValue.birthDate, 'yyyy-MM-dd'),
      cpf: this.getCpf(collaboratorFormValue.cpf),
      email: collaboratorFormValue.email,
      password: collaboratorFormValue.password,
      phone: collaboratorFormValue.phone,
      function: collaboratorFormValue.function,
      salary: collaboratorFormValue.salary,
      commision: collaboratorFormValue.commision,
      isAdmin: collaboratorFormValue.isAdmin ? collaboratorFormValue.isAdmin : false,
      licenses: collaboratorFormValue.licenses,
      services: collaboratorFormValue.services
    }
    const apiUrl = 'Collaborator';
    this.repository.createCollaborator(apiUrl, collaborator)
    .subscribe({
      next: (collab: Collaborator) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Mensagem de Sucesso',
            modalBodyText: `Collaborator: ${collab.name} created successfully`,
            okButtonText: 'OK'
          }
        };
  
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToCollaboratorList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToCollaboratorList = () => {
    this.router.navigate(['/collaborator/list']);
  }
}

export const servicesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const services = control.get('services').value;
  const licenses = control.get('licenses').value;

  if(services.length != 0){
    if(licenses.length == 0){
      return {servicesError: true, errorMessage: 'O colaborador não tem as habilitações necessária para esses serviços'}
    }
    else{
      let serviceErrorInfo = null;
      services.forEach(service => {
        let isLicenseAllowedOnService = false;
        licenses.forEach(license => {
          if(service.licenseCode == license.code){
            isLicenseAllowedOnService = true;
          }
        });

        if(isLicenseAllowedOnService == false){
          serviceErrorInfo = `O colaborador não tem a habilitação de código ${service.licenseCode}, necessária para o serviço de código ${service.code}`
        }
      });

      if(serviceErrorInfo != null){
        return {servicesError: true, errorMessage:  serviceErrorInfo}
      }
    }
  }
  
  return null
}
