import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { ContactRepositoryService } from 'src/app/shared/services/repositories/contact-repository.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact/contact.model';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {
  contact: Contact;
  bsModalRef?: BsModalRef;

  constructor(private repository: ContactRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.getContactByCode();
  }

  private getContactByCode = () => {
    const contactCode: string = this.activeRoute.snapshot.params['code'];
    const apiUrl: string = `Contact/${contactCode}`;

    this.repository.getContact(apiUrl)
    .subscribe({
      next: (colab: Contact) => this.contact = colab,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToContactList = () => {
    this.router.navigate(['/contact/list']);
  }

  deleteContact = () => {
    const deleteUri: string = `Contact/${this.contact.code}`;

    this.repository.deleteContact(deleteUri)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Mensagem de Sucesso',
            modalBodyText: 'Cliente deletado com sucesso!',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToContactList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

}
