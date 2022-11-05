import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor() { }

  createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  };

  generateHeaders = () => {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbWluMiIsInJvbGUiOiJDb2xsYWJvcmF0b3JBZG1pbiIsIkNvZGUiOjIsIm5iZiI6MTY2NzY3OTM3MywiZXhwIjoxNjcwMjcxMzczLCJpYXQiOjE2Njc2NzkzNzN9.1F3977Lo-4IYMyx6WLOG_CJ203Il3HR3xnMRLy1PivI',
      }),
    };
  };
}
