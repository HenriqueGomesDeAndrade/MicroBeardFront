import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ServiceRepositoryService } from 'src/app/shared/services/repositories/service-repository.service';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/service/service.model';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-service-delete',
  templateUrl: './service-delete.component.html',
  styleUrls: ['./service-delete.component.css']
})
export class ServiceDeleteComponent implements OnInit {
  service: Service;
  bsModalRef?: BsModalRef;

  constructor(private repository: ServiceRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.getServiceByCode();
  }

  private getServiceByCode = () => {
    const serviceCode: string = this.activeRoute.snapshot.params['code'];
    const apiUrl: string = `Service/${serviceCode}`;

    this.repository.getService(apiUrl)
    .subscribe({
      next: (colab: Service) => this.service = colab,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToServiceList = () => {
    this.router.navigate(['/service/list']);
  }

  deleteService = () => {
    const deleteUri: string = `Service/${this.service.code}`;

    this.repository.deleteService(deleteUri)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Mensagem de Sucesso',
            modalBodyText: 'Serviço deletado com sucesso!',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToServiceList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

}
