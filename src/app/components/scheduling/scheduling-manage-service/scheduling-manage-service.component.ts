import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/interfaces/service/service.model';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceAddModalComponent } from 'src/app/shared/modals/service-add-modal/service-add-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-scheduling-manage-service',
  templateUrl: './scheduling-manage-service.component.html',
  styleUrls: ['./scheduling-manage-service.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: forwardRef(() => SchedulingManageServiceComponent) 
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SchedulingManageServiceComponent
    }
  ]
})
export class SchedulingManageServiceComponent implements OnInit, ControlValueAccessor {

  @Input() service: Service;

  constructor(config: NgbModalConfig, private modalService: NgbModal,private modalService2: BsModalService, private router: Router) { }

  ngOnInit(): void {
  }

  handleEvent = (event: string, service: Service) =>{
    switch(event){
      case 'Remove':
        this.service = null
        this.onChanged(this.service);
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
        this.service = receivedEntry;
        modalRef.close();
        this.onChanged(this.service);
        this.onValidationChange();
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
      this.onChanged(this.service);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChanged(this.service);
    }
  }

  writeValue(serviceWritten: Service) {
    this.service = serviceWritten;
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
    const service = control.value;
    if (service ==  null) {
      return {
        mustBeFilled: true
      };
    }

    return null
  }

  onValidationChange: any = () => {};

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
}
}
