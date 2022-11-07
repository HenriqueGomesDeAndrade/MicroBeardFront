import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Collaborator } from 'src/app/interfaces/collaborator/collaborator.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-license-collaborators',
  templateUrl: './license-collaborators.component.html',
  styleUrls: ['./license-collaborators.component.css']
})
export class LicenseCollaboratorsComponent implements OnInit {
  @Input() collaborators: Collaborator[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCollaboratorClicked = (collaborator: Collaborator) => {
    const detailsUrl: string = `/collaborator/details/${collaborator.code}`;
    this.router.navigate([detailsUrl]);
  }
}
