import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/interfaces/service/service.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceAddModalComponent } from 'src/app/shared/modals/service-add-modal/service-add-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-manage-service',
  templateUrl: './collaborator-manage-service.component.html',
  styleUrls: ['./collaborator-manage-service.component.css']
})
export class CollaboratorManageServiceComponent implements OnInit {
  @Input() services: Service[];

  constructor(config: NgbModalConfig, private modalService: NgbModal,private modalService2: BsModalService, private router: Router) { }

  ngOnInit(): void {
  }

  handleEvent = (event: string, service: Service) =>{
    switch(event){
      case 'Remove':
        this.services.splice(this.services.indexOf(service), 1)
        break;
      case 'Clicked':
        const detailsUrl: string = `/service/details/${service.code}`;
        this.router.navigate([detailsUrl]);
        break;
    }
  }

  open() {
    const modalRef = this.modalService.open(ServiceAddModalComponent)
    modalRef.componentInstance.returnEntry.subscribe((receivedEntry) => {
      if(!this.services.some(service => service.code == receivedEntry.code)){
        this.services.push(receivedEntry);
      }
      else {
        modalRef.close();
      }
    })
    
  }

}
