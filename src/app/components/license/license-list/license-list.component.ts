import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { License } from 'src/app/interfaces/license/license.model';
import { LicenseRepositoryService } from 'src/app/shared/services/repositories/license-repository.service';

import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-license-list',
  templateUrl: './license-list.component.html',
  styleUrls: ['./license-list.component.css']
})
export class LicenseListComponent implements OnInit {
  licenses: License[];
  errorMessage: string = '';
  role: string;

  constructor(private repository: LicenseRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router) { }

  ngOnInit(): void {
    this.getAllLicenses();
    this.role = localStorage.getItem('userRole');
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

  private getLicenseDetails = (code) =>{
    const detailsUrl: string = `/license/details/${code}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage = (code) => { 
    const updateUrl: string = `/license/update/${code}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (code) => {
    const deleteUrl: string = `/license/delete/${code}`;
    this.router.navigate([deleteUrl])
  }
}
