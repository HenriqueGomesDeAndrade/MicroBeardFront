import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { License } from 'src/app/_interfaces/license.model';

@Component({
  selector: 'app-collaborator-licenses',
  templateUrl: './collaborator-licenses.component.html',
  styleUrls: ['./collaborator-licenses.component.css']
})
export class CollaboratorLicensesComponent implements OnInit {
  @Input() licenses: License[];
  @Output() onLicenseClick: EventEmitter<License> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onLicenseClicked = (license: License) => {
    this.onLicenseClick.emit(license);
  }
}
