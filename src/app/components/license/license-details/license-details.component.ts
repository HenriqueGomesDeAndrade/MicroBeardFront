import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { License } from 'src/app/interfaces/license/license.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LicenseRepositoryService } from 'src/app/shared/services/repositories/license-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.css']
})
export class LicenseDetailsComponent implements OnInit {
  license: License;
  errorMessage: string = '';

  constructor(private repository: LicenseRepositoryService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getLicenseDetails()
  }

  getLicenseDetails = () => {
    const code: string = this.activeRoute.snapshot.params['code'];
    const apiUrl: string = `License/${code}`;

    this.repository.getLicense(apiUrl)
    .subscribe({
      next: (colab: License) => this.license = colab,
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
