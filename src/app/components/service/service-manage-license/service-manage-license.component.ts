import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceAddModalComponent } from 'src/app/shared/modals/service-add-modal/service-add-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';
import { License } from 'src/app/interfaces/license/license.model';
import { LicenseAddModalComponent } from 'src/app/shared/modals/license-add-modal/license-add-modal.component';


@Component({
  selector: 'app-service-manage-license',
  templateUrl: './service-manage-license.component.html',
  styleUrls: ['./service-manage-license.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: forwardRef(() => ServiceManageLicenseComponent) 
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ServiceManageLicenseComponent
    }
  ]
})
export class ServiceManageLicenseComponent implements OnInit {

  @Input() license: License;

  constructor(config: NgbModalConfig, private modalService: NgbModal,private modalService2: BsModalService, private router: Router) { }

  ngOnInit(): void {
  }

  handleEvent = (event: string, license: License) =>{
    switch(event){
      case 'Remove':
        this.license = null
        this.onChanged(this.license);
        this.onValidationChange();
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
        this.license = receivedEntry;
        modalRef.close();
        this.onChanged(this.license);
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
      this.onChanged(this.license);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled) {
      this.onChanged(this.license);
    }
  }

  writeValue(serviceWritten: License) {
    this.license = serviceWritten;
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
    const license = control.value;
    if (license == null) {
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
