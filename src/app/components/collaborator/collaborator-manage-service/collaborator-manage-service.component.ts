import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/interfaces/service/service.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceAddModalComponent } from 'src/app/shared/modals/service-add-modal/service-add-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-collaborator-manage-service',
  templateUrl: './collaborator-manage-service.component.html',
  styleUrls: ['./collaborator-manage-service.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: forwardRef(() => CollaboratorManageServiceComponent) 
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CollaboratorManageServiceComponent
    }
  ]
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
        this.onChanged(this.services);
        this.onValidationChange();
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

        this.onChanged(this.services);
        this.onValidationChange();
      }
      else {
        modalRef.close();
      }
    })
    
  }

  //FORM VALIDATIONS

  onChanged = (service) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChanged(this.services);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChanged(this.services);
    }
  }

  writeValue(serviceWritten: Service[]) {
    this.services = serviceWritten;
  }

  registerOnChange(onChange: any) {
    this.onChanged = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const services = control.value;
    if (services == null) {
      return {
        licenseValid: true
      };
    }
  }

  onValidationChange: any = () => {};

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }
}


