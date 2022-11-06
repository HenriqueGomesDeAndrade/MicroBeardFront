import { Component, OnInit } from '@angular/core';
import { AuthRepositoryService } from 'src/app/shared/services/repositories/auth-repository.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isCollapsed: boolean = false;
  constructor(private authRepo: AuthRepositoryService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authRepo.logout()
  }

}
