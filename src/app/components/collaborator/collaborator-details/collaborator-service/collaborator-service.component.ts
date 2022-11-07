import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Service } from 'src/app/interfaces/service/service.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-service',
  templateUrl: './collaborator-service.component.html',
  styleUrls: ['./collaborator-service.component.css']
})
export class CollaboratorServiceComponent implements OnInit {
  @Input() services: Service[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onServiceClicked = (service: Service) => {
    const detailsUrl: string = `/service/details/${service.code}`;
    this.router.navigate([detailsUrl]);
  }
}
