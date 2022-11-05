import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { License } from 'src/app/interfaces/license/license.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenseAddModalComponent } from 'src/app/shared/modals/license-add-modal/license-add-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-collaborator-update-license',
  templateUrl: './collaborator-update-license.component.html',
  styleUrls: ['./collaborator-update-license.component.css']
})
export class CollaboratorUpdateLicenseComponent implements OnInit {
  @Input() licenses: License[];

  constructor(config: NgbModalConfig, private modalService: NgbModal,private modalService2: BsModalService) { }

  ngOnInit(): void {
  }

  handleEvent = (event: string, license: License) =>{
    switch(event){
      case 'Remove':
        this.licenses.splice(this.licenses.indexOf(license), 1)
        console.log('LICENSES AUTIA', this.licenses)
        break;
      case 'Clicked':
        break;
    }
  }

  open() {
    const modalRef = this.modalService.open(LicenseAddModalComponent)
    modalRef.componentInstance.returnEntry.subscribe((receivedEntry) => {
      if(!this.licenses.some(license => license.code == receivedEntry.code)){
        this.licenses.push(receivedEntry);
      }
      else {
        modalRef.close();
      }
    })
    
  }
}
