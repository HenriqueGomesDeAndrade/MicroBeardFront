import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  errorMessage: string = "Error 401 Unauthorized access"
  constructor() { }

  ngOnInit(): void {
  }

}
