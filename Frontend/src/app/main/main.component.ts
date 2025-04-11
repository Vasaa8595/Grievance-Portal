import { Component } from '@angular/core';
import { SidenavComponent } from '../Components/sidenav/sidenav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [SidenavComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {

  role: string;
  constructor(private router: Router) {
    const session = sessionStorage.getItem('user');
    if (!session) {
      this.role = '';
      this.router.navigateByUrl('/login');
      return;
    }
    const parsedUser = JSON.parse(session);
    this.role = parsedUser.role;
  }
  
}
