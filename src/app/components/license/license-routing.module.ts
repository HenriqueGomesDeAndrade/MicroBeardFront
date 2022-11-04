import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LicenseListComponent } from './license-list/license-list.component';
import { LicenseDetailsComponent } from './license-details/license-details.component';
import { LicenseCreateComponent } from './license-create/license-create.component';
import { LicenseUpdateComponent } from './license-update/license-update.component';
import { LicenseDeleteComponent } from './license-delete/license-delete.component';

const routes: Routes = [
  { path: 'list', component: LicenseListComponent },
  { path: 'details/:code', component: LicenseDetailsComponent },
  { path: 'create', component: LicenseCreateComponent },
  { path: 'update/:code', component: LicenseUpdateComponent },
  { path: 'delete/:code', component: LicenseDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
