import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Service } from 'src/app/interfaces/service/service.model';
import { ServiceForCreation } from 'src/app/interfaces/service/service-create.model';
import { ServiceForUpdate } from 'src/app/interfaces/service/service-update.model';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceRepositoryService {
  constructor(
    private http: HttpClient,
    private envUrl: EnvironmentUrlService,
    private repo: RepositoryService
  ) {}

  public getServices = (route: string) => {
    return this.http.get<Service[]>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      this.repo.generateHeaders()
    );
  };

  public getService = (route: string) => {
    return this.http.get<Service>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      this.repo.generateHeaders()
    );
  };

  public createService = (route: string, service: ServiceForCreation) => {
    return this.http.post<Service>(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      service,
      this.repo.generateHeaders()
    );
  };

  public updateService = (route: string, service: ServiceForUpdate) => {
    return this.http.put(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      service,
      this.repo.generateHeaders()
    );
  };

  public deleteService = (route: string) => {
    return this.http.delete(
      this.repo.createCompleteRoute(route, this.envUrl.urlAddress),
      this.repo.generateHeaders()
    );
  };
}
