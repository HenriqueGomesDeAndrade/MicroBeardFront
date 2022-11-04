import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './components/error-pages/not-found/not-found.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactModule } from './components/contact/contact.module';
import { ServiceModule } from './components/service/service.module';
import { CollaboratorModule } from './components/collaborator/collaborator.module';
import { LicenseModule } from './components/license/license.module';
import { InternalServerComponent } from './components/error-pages/internal-server/internal-server.component';
import { UnauthorizedComponent } from './components/error-pages/unauthorized/unauthorized.component';
import { DatePipe } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    NotFoundComponent,
    InternalServerComponent,
    UnauthorizedComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    ContactModule,
    ServiceModule,
    CollaboratorModule,
    LicenseModule,
    NgbModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
