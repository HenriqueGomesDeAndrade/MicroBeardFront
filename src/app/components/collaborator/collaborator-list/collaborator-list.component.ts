import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { CollaboratorRepositoryService } from 'src/app/shared/services/repositories/collaborator-repository.service';

import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {
  collaborators: Collaborator[];
  errorMessage: string = '';
  role: string;

  constructor(private repository: CollaboratorRepositoryService,
               private errorHandler: ErrorHandlerService,
                private router: Router) { }

  ngOnInit(): void {
    this.getAllCollaborators();
    this.role = localStorage.getItem('userRole');
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

  private getCollaboratorDetails = (code) =>{
    const detailsUrl: string = `/collaborator/details/${code}`;
    this.router.navigate([detailsUrl]);
  }

  public redirectToUpdatePage = (code) => { 
    const updateUrl: string = `/collaborator/update/${code}`; 
    this.router.navigate([updateUrl]); 
  }

  public redirectToDeletePage = (code) => {
    const deleteUrl: string = `/collaborator/delete/${code}`;
    this.router.navigate([deleteUrl])
  }
}
