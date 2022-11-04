import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { LicenseRepositoryService } from 'src/app/shared/services/repositories/license-repository.service';
import { Component, OnInit } from '@angular/core';
import { License } from 'src/app/interfaces/license/license.model';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-license-delete',
  templateUrl: './license-delete.component.html',
  styleUrls: ['./license-delete.component.css']
})
export class LicenseDeleteComponent implements OnInit {
  license: License;
  bsModalRef?: BsModalRef;

  constructor(private repository: LicenseRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.getLicenseByCode();
  }

  private getLicenseByCode = () => {
    const licenseCode: string = this.activeRoute.snapshot.params['code'];
    const apiUrl: string = `License/${licenseCode}`;

    this.repository.getLicense(apiUrl)
    .subscribe({
      next: (colab: License) => this.license = colab,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToLicenseList = () => {
    this.router.navigate(['/license/list']);
  }

  deleteLicense = () => {
    const deleteUri: string = `License/${this.license.code}`;

    this.repository.deleteLicense(deleteUri)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'License deleted successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToLicenseList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

}
