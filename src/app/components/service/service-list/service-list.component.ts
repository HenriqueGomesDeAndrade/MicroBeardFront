import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service/service.model';
import { ServiceRepositoryService } from 'src/app/shared/services/repositories/service-repository.service';

import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
  services: Service[];
  errorMessage: string = '';

  constructor(private repository: ServiceRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router) { }

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

  private getServiceDetails = (code) =>{
    const detailsUrl: string = `/service/details/${code}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage = (code) => { 
    const updateUrl: string = `/service/update/${code}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (code) => {
    const deleteUrl: string = `/service/delete/${code}`;
    this.router.navigate([deleteUrl])
  }
}
