import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ErrorModalComponent } from '../modals/error-modal/error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor(private router: Router, private modal: BsModalService) {}

  public handleError = (error: HttpErrorResponse) => {
    if (error.status == 500) {
      this.handle500Error(error);
    } else if (error.status === 404) {
      this.handle404Error(error);
    } else if (error.status === 401) {
      this.handle401Error(error);
    } else {
      this.handleOtherError(error);
    }
  };

  private handle500Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  };

  private handle404Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/404']);
  };

  private handle401Error = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);
    this.router.navigate(['/401']);
  };

  private handleOtherError = (error: HttpErrorResponse) => {
    this.createErrorMessage(error);

    const config: ModalOptions = {
      initialState: {
        modalHeaderText: 'Error Message',
        modalBodyText: this.errorMessage,
        okButtonText: 'OK',
      },
    };
    this.modal.show(ErrorModalComponent, config);
  };

  private createErrorMessage = (error: HttpErrorResponse) => {
    if (
      this.errorMessage != '' &&
      this.errorMessage != null &&
      this.errorMessage != undefined
    ) {
      this.errorMessage = error.error
        ? JSON.stringify(error.error)
        : error.statusText;
    } else {
      this.errorMessage =
        'Parece que alguém fez login com as mesmas credenciais que você, por favor fazer login novamente';
    }
  };
}
