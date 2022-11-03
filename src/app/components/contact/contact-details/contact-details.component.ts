import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact } from 'src/app/interfaces/contact/contact.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactRepositoryService } from 'src/app/shared/services/repositories/contact-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact;
  errorMessage: string = '';

  constructor(private repository: ContactRepositoryService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getContactDetails()
  }

  getContactDetails = () => {
    const code: string = this.activeRoute.snapshot.params['code'];
    const apiUrl: string = `Contact/${code}`;

    this.repository.getContact(apiUrl)
    .subscribe({
      next: (colab: Contact) => this.contact = colab,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }
}
