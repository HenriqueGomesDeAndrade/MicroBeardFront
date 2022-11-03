import { Component, OnInit } from '@angular/core';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { CollaboratorRepositoryService } from 'src/app/shared/services/repositories/collaborator-repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { CollaboratorForCreation } from 'src/app/interfaces/collaborator/collaborator-create.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-collaborator-create',
  templateUrl: './collaborator-create.component.html',
  styleUrls: ['./collaborator-create.component.css']
})
export class CollaboratorCreateComponent implements OnInit {
  errorMessage: string = '';
  collaboratorForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: CollaboratorRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private datePipe: DatePipe,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.collaboratorForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      birthDate: new FormControl('', [Validators.required]),
      cpf: new FormControl('',[]),
      email: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      password: new FormControl('',[]),
      phone: new FormControl('',[]),
      function: new FormControl('',[]),
      salary: new FormControl('',[]),
      commision: new FormControl('',[]),
      isAdmin: new FormControl('',[]),
    });
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

  private executeCollaboratorCreation = (collaboratorFormValue) => {
    const collaborator: CollaboratorForCreation = {
      name: collaboratorFormValue.name,
      birthDate: this.datePipe.transform(collaboratorFormValue.birthDate, 'yyyy-MM-dd'),
      cpf: collaboratorFormValue.cpf,
      email: collaboratorFormValue.email,
      password: collaboratorFormValue.password,
      phone: collaboratorFormValue.phone,
      function: collaboratorFormValue.function,
      salary: collaboratorFormValue.salary,
      commision: collaboratorFormValue.commision,
      isAdmin: collaboratorFormValue.isAdmin ? collaboratorFormValue.isAdmin : false,
    }
    const apiUrl = 'Collaborator';
    this.repository.createCollaborator(apiUrl, collaborator)
    .subscribe({
      next: (collab: Collaborator) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
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
