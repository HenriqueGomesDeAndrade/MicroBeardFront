import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service/service.model';
import { ServiceRepositoryService } from '../../services/repositories/service-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-service-add-modal',
  templateUrl: './service-add-modal.component.html',
  styleUrls: ['./service-add-modal.component.css']
})
export class ServiceAddModalComponent implements OnInit {

  @Output() returnEntry: EventEmitter<any> = new EventEmitter();
  services: Service[];
  errorMessage: string = '';
  closeResult = '';

  constructor(private modalService: NgbModal,
              private repository: ServiceRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router,
                private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  private getAllServices = () => {
    const apiAddress: string = 'Service';
    this.repository.getServices(apiAddress)
    .subscribe({
      next: (colab: Service[]) => this.services = colab,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  close = () => {
    this.modalService.dismissAll();
  }

  public returnService = (service:Service) => {
    this.returnEntry.emit(service);
  }

}
