import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact/contact.model';
import { ContactRepositoryService } from 'src/app/shared/services/repositories/contact-repository.service';

import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  errorMessage: string = '';
  role: string;

  constructor(private repository: ContactRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router) { }

  ngOnInit(): void {
    this.getAllContacts();
    this.role = localStorage.getItem('userRole');
  }

  private getAllContacts = () => {
    const apiAddress: string = 'Contact';
    this.repository.getContacts(apiAddress)
    .subscribe({
      next: (colab: Contact[]) => this.contacts = colab,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  private getContactDetails = (code) =>{
    const detailsUrl: string = `/contact/details/${code}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage = (code) => { 
    const updateUrl: string = `/contact/update/${code}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (code) => {
    const deleteUrl: string = `/contact/delete/${code}`;
    this.router.navigate([deleteUrl])
  }
}
