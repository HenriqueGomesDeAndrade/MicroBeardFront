import { Collaborator } from './../../_interfaces/collaborator.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  public createCollaborator = (route: string, collaborator: Collaborator) => {
    return this.http.post<Collaborator>(this.createCompleteRoute(route, this.envUrl.urlAddress), collaborator, this.generateHeaders());
  }

  public updateCollaborator = (route: string, collaborator: Collaborator) => {
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
         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbWluIiwicm9sZSI6IkNvbGxhYm9yYXRvckFkbWluIiwiQ29kZSI6MSwibmJmIjoxNjY3MzA5NzA3LCJleHAiOjE2Njk5MDE3MDcsImlhdCI6MTY2NzMwOTcwN30.6vpfPAbY6K94qMpVC52r2G_5Hpvkg6sUwFEwKcVke9A'
        })
    }
  }
}
