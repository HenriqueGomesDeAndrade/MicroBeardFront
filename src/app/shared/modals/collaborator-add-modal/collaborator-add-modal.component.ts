import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { CollaboratorRepositoryService } from '../../services/repositories/collaborator-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-collaborator-add-modal',
  templateUrl: './collaborator-add-modal.component.html',
  styleUrls: ['./collaborator-add-modal.component.css']
})
export class CollaboratorAddModalComponent implements OnInit {

  @Output() returnEntry: EventEmitter<any> = new EventEmitter();
  collaborators: Collaborator[];
  errorMessage: string = '';
  closeResult = '';

  constructor(private modalService: NgbModal,
              private repository: CollaboratorRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router,
                private bsModalRef: BsModalRef) { }
  
  ngOnInit(): void {
    this.getAllCollaborators();
  }

  private getAllCollaborators = () => {
    const apiAddress: string = 'Collaborator';
    this.repository.getCollaborators(apiAddress)
    .subscribe({
      next: (colab: Collaborator[]) => this.collaborators = colab,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  close = () => {
    this.modalService.dismissAll();
  }

  public returnCollaborator = (collaborator:Collaborator) => {
    this.returnEntry.emit(collaborator);
  }

}
