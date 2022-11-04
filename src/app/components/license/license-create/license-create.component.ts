import { Component, OnInit } from '@angular/core';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { LicenseRepositoryService } from 'src/app/shared/services/repositories/license-repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { License } from 'src/app/interfaces/license/license.model';
import { LicenseForCreation } from 'src/app/interfaces/license/license-create.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-license-create',
  templateUrl: './license-create.component.html',
  styleUrls: ['./license-create.component.css']
})
export class LicenseCreateComponent implements OnInit {
  errorMessage: string = '';
  licenseForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: LicenseRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.licenseForm = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
    });
  }

  validateControl = (controlName: string) => {
    if (this.licenseForm.get(controlName).invalid && this.licenseForm.get(controlName).touched)
      return true;
    
    return false;
  } 
  
  hasError = (controlName: string, errorName: string) => {
    if (this.licenseForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  createLicense = (licenseFormValue) => {
    if(this.licenseForm.valid)
      this.executeLicenseCreation(licenseFormValue);
  }

  private executeLicenseCreation = (licenseFormValue) => {
    const license: LicenseForCreation = {
      description: licenseFormValue.description,
     }
    const apiUrl = 'License';
    this.repository.createLicense(apiUrl, license)
    .subscribe({
      next: (cont: License) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `License: ${cont.description} created successfully`,
            okButtonText: 'OK'
          }
        };
  
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToLicenseList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  redirectToLicenseList = () => {
    this.router.navigate(['/license/list']);
  }
}
