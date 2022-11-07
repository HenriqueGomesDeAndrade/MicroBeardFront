import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/interfaces/service/service.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-license-services',
  templateUrl: './license-services.component.html',
  styleUrls: ['./license-services.component.css']
})
export class LicenseServicesComponent implements OnInit {

  @Input() services: Service[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onServiceClicked = (service: Service) => {
    const detailsUrl: string = `/service/details/${service.code}`;
    this.router.navigate([detailsUrl]);
  }
}
