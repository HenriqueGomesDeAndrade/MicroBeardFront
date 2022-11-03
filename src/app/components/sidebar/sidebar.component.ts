import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  active = '';

  constructor(private router: Router) {
    this.router.events.subscribe(value => {
      if(value instanceof NavigationEnd)   
        console.log(this.router.url.toString().split('/')[1]) 
        this.active = this.router.url.toString().split('/')[1]
      });
  }

  ngOnInit(): void {}
}
