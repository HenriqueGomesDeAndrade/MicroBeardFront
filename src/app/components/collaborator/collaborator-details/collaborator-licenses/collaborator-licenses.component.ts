import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { License } from 'src/app/interfaces/license/license.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-licenses',
  templateUrl: './collaborator-licenses.component.html',
  styleUrls: ['./collaborator-licenses.component.css']
})
export class CollaboratorLicensesComponent implements OnInit {
  @Input() licenses: License[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLicenseClicked = (license: License) => {
    const detailsUrl: string = `/license/details/${license.code}`;
    this.router.navigate([detailsUrl]);
  }
}
