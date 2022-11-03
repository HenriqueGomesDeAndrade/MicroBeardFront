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
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkbWluIiwicm9sZSI6IkNvbGxhYm9yYXRvckFkbWluIiwiQ29kZSI6MSwibmJmIjoxNjY3NDM2MzY3LCJleHAiOjE2NzAwMjgzNjcsImlhdCI6MTY2NzQzNjM2N30.9KU4zm5nUL6kBzVOsxasu6RCTabE5_-BliidNAmehDo',
      }),
    };
  };
}
