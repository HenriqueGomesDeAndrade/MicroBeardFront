import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule} from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxMaskModule } from 'ngx-mask';

import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';

import { AppendDirective } from './directives/append.directive';

import { DatePipe } from '@angular/common';
import { CpfCnpjPipe } from './pipes/cpf-cnpj.pipe';
import { PhonePipe } from './pipes/phone.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
    AppendDirective,
    CpfCnpjPipe,
    PhonePipe,
  ],
  imports: [
    ModalModule.forRoot(),
    CommonModule,
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    BsDatepickerModule,
    NgxMaskModule,
    ErrorModalComponent,
    SuccessModalComponent,
    CpfCnpjPipe,
    PhonePipe,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class SharedModule { }
