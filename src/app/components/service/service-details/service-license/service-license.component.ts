import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { License } from 'src/app/interfaces/license/license.model';


@Component({
  selector: 'app-service-license',
  templateUrl: './service-license.component.html',
  styleUrls: ['./service-license.component.css']
})
export class ServiceLicenseComponent implements OnInit {

  @Input() license: License;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLicenseClicked = (license: License) => {
    const detailsUrl: string = `/license/details/${license.code}`;
    this.router.navigate([detailsUrl]);
  }
}
