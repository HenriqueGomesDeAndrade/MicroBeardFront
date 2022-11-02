import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from 'src/app/interfaces/contact/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) {}

  public getContacts = (route: string) => {
    return this.http.get<Contact[]>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }

  public getContact = (route: string) => {
    return this.http.get<Contact>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }

  public updateContact = (route: string, Contact: Contact) => {
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), Contact, this.generateHeaders());
  }

  public deleteContact = (route: string) => {
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
