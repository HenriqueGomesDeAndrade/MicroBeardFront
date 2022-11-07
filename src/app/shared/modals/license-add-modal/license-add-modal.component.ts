import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { License } from 'src/app/interfaces/license/license.model';
import { LicenseRepositoryService } from 'src/app/shared/services/repositories/license-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-license-add-modal',
  templateUrl: './license-add-modal.component.html',
  styleUrls: ['./license-add-modal.component.css']
})
export class LicenseAddModalComponent{
  @Output() returnEntry: EventEmitter<any> = new EventEmitter();
  licenses: License[];
  errorMessage: string = '';
  closeResult = '';

  constructor(private modalService: NgbModal,
              private repository: LicenseRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router,
                private bsModalRef: BsModalRef) { }
  
  ngOnInit(): void {
    this.getAllLicenses();
  }

  private getAllLicenses = () => {
    const apiAddress: string = 'License';
    this.repository.getLicenses(apiAddress)
    .subscribe({
      next: (colab: License[]) => this.licenses = colab,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  close = () => {
    this.modalService.dismissAll();
  }

  public returnLicense = (license:License) => {
    this.returnEntry.emit(license);
  }

}
