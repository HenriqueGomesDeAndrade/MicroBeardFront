import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { License } from 'src/app/interfaces/license/license.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenseAddModalComponent } from 'src/app/shared/modals/license-add-modal/license-add-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-manage-license',
  templateUrl: './collaborator-manage-license.component.html',
  styleUrls: ['./collaborator-manage-license.component.css']
})
export class CollaboratorManageLicenseComponent implements OnInit {
  @Input() licenses: License[];

  constructor(config: NgbModalConfig, private modalService: NgbModal,private modalService2: BsModalService, private router: Router) { }

  ngOnInit(): void {
  }

  handleEvent = (event: string, license: License) =>{
    switch(event){
      case 'Remove':
        this.licenses.splice(this.licenses.indexOf(license), 1)
        break;
      case 'Clicked':
        const detailsUrl: string = `/license/details/${license.code}`;
        this.router.navigate([detailsUrl]);
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
