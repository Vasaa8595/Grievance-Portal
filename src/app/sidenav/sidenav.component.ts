import { Component, EventEmitter, inject, Input, Output, Renderer2 } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

import { navbarData } from './nav-data';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { routes } from '../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from '../dashboard/dashboard.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    MatToolbar,
    MatIcon,
    MatList,MatListItem,
    RouterModule,
    MatToolbarModule,MatSidenavModule,MatIconModule,MatListModule,MatButtonModule,DashboardComponent
    
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  opened = false;

  auth = inject(AuthService);
  loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser")!);
  Name: string = this.loggedInUser?.name || '';
  profileimage: string = this.loggedInUser?.picture || '';
  Email: string = this.loggedInUser?.email || '';

  signOut() {
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  @Input({ required: true }) userimg: string = '';
  @Input({ required: true }) name: string = '';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.addGlobalClickListener();
  }

  toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }

  addGlobalClickListener() {
    this.renderer.listen('window', 'click', (event: Event) => {
      const dropdown = document.querySelector('.dropdown');
      const target = event.target as HTMLElement;
      if (dropdown && !dropdown.contains(target)) {
        dropdown.classList.remove('active');
      }
    });
  }
}
