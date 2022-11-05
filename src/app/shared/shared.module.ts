import { NgModule } from '@angular/core';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { AppendDirective } from './directives/append.directive';
import { ModalModule} from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { LicenseAddModalComponent } from './modals/license-add-modal/license-add-modal.component';

@NgModule({
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
    AppendDirective,
    CpfCnpjPipe,
    PhonePipe,
    LicenseAddModalComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    ErrorModalComponent,
    SuccessModalComponent,
    CpfCnpjPipe,
    PhonePipe,
    NgxMaskModule,
  ]
})
export class SharedModule { }
