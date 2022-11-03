import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CollaboratorRepositoryService } from 'src/app/shared/services/repositories/collaborator-repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { License } from 'src/app/interfaces/license/license.model';

@Component({
  selector: 'app-collaborator-details',
  templateUrl: './collaborator-details.component.html',
  styleUrls: ['./collaborator-details.component.css']
})
export class CollaboratorDetailsComponent implements OnInit {
  collaborator: Collaborator;
  errorMessage: string = '';

  constructor(private repository: CollaboratorRepositoryService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getCollaboratorDetails()
  }

  getCollaboratorDetails = () => {
    const code: string = this.activeRoute.snapshot.params['code'];
    const apiUrl: string = `Collaborator/${code}`;

    this.repository.getCollaborator(apiUrl)
    .subscribe({
      next: (colab: Collaborator) => this.collaborator = colab,
      error: (err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  } 

  printToConsole= (param: License) => {
    console.log('Account parameter from the child component', param)
  }
}
