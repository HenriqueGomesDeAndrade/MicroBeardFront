import { Component, OnInit } from '@angular/core';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { LicenseRepositoryService } from 'src/app/shared/services/repositories/license-repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { License } from 'src/app/interfaces/license/license.model';
import { LicenseForUpdate } from 'src/app/interfaces/license/license-update.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-license-update',
  templateUrl: './license-update.component.html',
  styleUrls: ['./license-update.component.css'],
})
export class LicenseUpdateComponent implements OnInit {
  license: License;
  licenseForm: FormGroup;
  bsModalRef?: BsModalRef;
  role: string;

  constructor(
    private repository: LicenseRepositoryService,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private modal: BsModalService
  ) {}

  ngOnInit(): void {
    this.licenseForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });

    this.getLicenseByCode();
    this.role = localStorage.getItem('userRole');
  }

  ngAfterContentChecked(): void {
    this.role !== 'Collaborator' 
    ? null
    : this.router.navigate(['license/list']);
  }

  private getLicenseByCode = () => {
    const licenseCode: string = this.activeRoute.snapshot.params['code'];
    const licenseByCodeUri: string = `License/${licenseCode}`;
    this.repository.getLicense(licenseByCodeUri).subscribe({
      next: (cont: License) => {
        this.license = {
          ...cont,
        };
        this.licenseForm.patchValue(this.license);
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err),
    });
  };

  validateControl = (controlName: string) => {
    if (
      this.licenseForm.get(controlName).invalid &&
      this.licenseForm.get(controlName).touched
    )
      return true;

    return false;
  };

  hasError = (controlName: string, errorName: string) => {
    if (this.licenseForm.get(controlName).hasError(errorName)) return true;

    return false;
  };

  public updateLicense = (licenseFormValue) => {
    if (this.licenseForm.valid) this.executeLicenseUpdate(licenseFormValue);
  };

  private executeLicenseUpdate = (licenseFormValue) => {
    const licenseForUpd: LicenseForUpdate = {
      description: licenseFormValue.description,
    };

    const apiUri: string = `License/${this.license.code}`;

    this.repository.updateLicense(apiUri, licenseForUpd).subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Mensagem de Sucesso',
            modalBodyText: 'Habilitação alterada com sucesso!',
            okButtonText: 'OK',
          },
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe((_) =>
          this.redirectToLicenseList()
        );
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err),
    });
  };

  public redirectToLicenseList = () => {
    this.router.navigate(['/license/list']);
  };
}
