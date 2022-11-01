import { Component, OnInit } from '@angular/core';

import { Collaborator } from 'src/app/_interfaces/collaborator.model';
import { CollaboratorRepositoryService } from 'src/app/shared/services/collaborator-repository.service';

@Component({
  selector: 'app-collaborator-list',
  templateUrl: './collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorListComponent implements OnInit {
  collaborators: Collaborator[];

  constructor(private repository: CollaboratorRepositoryService) { }

  ngOnInit(): void {
    this.getAllCollaborators();
  }

  private getAllCollaborators = () => {
    const apiAddress: string = 'Collaborator';
    this.repository.getCollaborators(apiAddress)
    .subscribe(colab => {
      this.collaborators = colab;
    })
  }
}
