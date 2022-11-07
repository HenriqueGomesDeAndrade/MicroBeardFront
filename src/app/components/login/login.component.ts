import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthForUser } from 'src/app/interfaces/auth/auth-user.model';
import { AuthRepositoryService } from 'src/app/shared/services/repositories/auth-repository.service';

import { Component, OnInit } from '@angular/core';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup;
  bsModalRef?: BsModalRef;

  constructor(private repository: AuthRepositoryService,
              private errorHandler: ErrorHandlerService,
              private router: Router,
              private modal: BsModalService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(80), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',[Validators.required, Validators.min(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    });
  }

  validateControl = (controlName: string) => {
    if (this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched)
      return true;
    
    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if (this.loginForm.get(controlName).hasError(errorName))
      return true;
    
    return false;
  }

  public login = (loginFormValue) => {
    if(this.loginForm.valid)
      this.executeLogin(loginFormValue)
  }
 
  private executeLogin(loginFormValue){
    const login: AuthForUser = {
      email: loginFormValue.email,
      password: loginFormValue.password,
    }

    const apiUri: string = `Collaborator/Login`;

    this.repository.login(apiUri, login).subscribe({
      next: (user: AuthForUser) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Mensagem de Sucesso',
            modalBodyText: `Usuário logado com sucesso!`,
            okButtonText: 'OK'
          }
        };
  
        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToHome());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    });

    //var user = this.loginForm.getRawValue() as AuthForUser;

    // this.repository.login(user)
    // this.authService.login(user).subscribe((response) => {
    //     if(!response.sucesso){
    //       this.snackBar.open('Falha na autenticação', 'Usuário ou senha incorretos.', {
    //         duration: 3000
    //       });
    //     }
    // })
  }

  redirectToHome = () => {
    this.router.navigate(['/scheduling/calendar']);
  }
}