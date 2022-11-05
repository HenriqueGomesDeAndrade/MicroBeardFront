import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { License } from 'src/app/interfaces/license/license.model';

@Component({
  selector: 'app-collaborator-update-license',
  templateUrl: './collaborator-update-license.component.html',
  styleUrls: ['./collaborator-update-license.component.css']
})
export class CollaboratorUpdateLicenseComponent implements OnInit {
  @Input() licenses: License[];

  constructor() { }

  ngOnInit(): void {
  }

  handleEvent = (event: string, license: License) =>{
    switch(event){
      case 'Remove':
        this.licenses.splice(this.licenses.indexOf(license), 1)
        break;
      case 'Clicked':
        break;
    }
  }
}
