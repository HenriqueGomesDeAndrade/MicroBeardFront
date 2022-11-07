import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact/contact.model';
import { ContactRepositoryService } from '../../services/repositories/contact-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-contact-add-modal',
  templateUrl: './contact-add-modal.component.html',
  styleUrls: ['./contact-add-modal.component.css']
})
export class ContactAddModalComponent implements OnInit {

  @Output() returnEntry: EventEmitter<any> = new EventEmitter();
  contacts: Contact[];
  errorMessage: string = '';
  closeResult = '';

  constructor(private modalService: NgbModal,
              private repository: ContactRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router,
                private bsModalRef: BsModalRef) { }
  
  ngOnInit(): void {
    this.getAllContacts();
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

  close = () => {
    this.modalService.dismissAll();
  }

  public returnContact = (contact:Contact) => {
    this.returnEntry.emit(contact);
  }

}
