import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { CollaboratorForCreation } from 'src/app/interfaces/collaborator/collaborator-create.model';
import { CollaboratorForUpdate } from 'src/app/interfaces/collaborator/collaborator-update.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }
  public getCollaborators = (route: string) => {
    return this.http.get<Collaborator[]>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }

  public getCollaborator = (route: string) => {
    return this.http.get<Collaborator>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }

  public createCollaborator = (route: string, collaborator: CollaboratorForCreation) => {
    return this.http.post<Collaborator>(this.createCompleteRoute(route, this.envUrl.urlAddress), collaborator, this.generateHeaders());
  }

  public updateCollaborator = (route: string, collaborator: CollaboratorForUpdate) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), collaborator, this.generateHeaders());
  }

  public deleteCollaborator = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }


  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({
         'Content-Type': 'application/json', 
         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbWluMiIsInJvbGUiOiJDb2xsYWJvcmF0b3JBZG1pbiIsIkNvZGUiOjIsIm5iZiI6MTY2NzQzNTM1NCwiZXhwIjoxNjcwMDI3MzU0LCJpYXQiOjE2Njc0MzUzNTR9.RxGda7xgkRYoFHvTwKxkALOtdNgTXcYjWFS19psHRnI'
        })
    }
  }
}
