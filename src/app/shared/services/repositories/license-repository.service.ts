import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { License } from 'src/app/interfaces/license/license.model';
import { LicenseForCreation } from 'src/app/interfaces/license/license-create.model';
import { LicenseForUpdate } from 'src/app/interfaces/license/license-update.model';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root',
})
export class LicenseRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private repo: RepositoryService
  ) {}

  public getLicenses = (route: string) => {
    return this.http.get<License[]>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      
    );
  };

  public getLicense = (route: string) => {
    return this.http.get<License>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      
    );
  };

  public createLicense = (route: string, license: LicenseForCreation) => {
    return this.http.post<License>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      license,
      
    );
  };

  public updateLicense = (route: string, license: LicenseForUpdate) => {
    return this.http.put(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      license,
      
    );
  };

  public deleteLicense = (route: string) => {
    return this.http.delete(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      
    );
  };
}
