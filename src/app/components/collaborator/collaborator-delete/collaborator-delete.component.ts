import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { CollaboratorRepositoryService } from 'src/app/shared/services/repositories/collaborator-repository.service';
import { Component, OnInit } from '@angular/core';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';

@Component({
  selector: 'app-collaborator-delete',
  templateUrl: './collaborator-delete.component.html',
  styleUrls: ['./collaborator-delete.component.css']
})
export class CollaboratorDeleteComponent implements OnInit {
  collaborator: Collaborator;
  bsModalRef?: BsModalRef;

  constructor(private repository: CollaboratorRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.getCollaboratorByCode();
  }

  private getCollaboratorByCode = () => {
    const collaboratorCode: string = this.activeRoute.snapshot.params['code'];
    const apiUrl: string = `Collaborator/${collaboratorCode}`;

    this.repository.getCollaborator(apiUrl)
    .subscribe({
      next: (colab: Collaborator) => this.collaborator = colab,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToCollaboratorList = () => {
    this.router.navigate(['/collaborator/list']);
  }

  deleteCollaborator = () => {
    const deleteUri: string = `Collaborator/${this.collaborator.code}`;

    this.repository.deleteCollaborator(deleteUri)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: 'Collaborator deleted successfully',
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToCollaboratorList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

}
