import { NgFor } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatToolbar,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    RouterLink,
    NgFor,
    MatListItem,
    MatNavList,
    RouterOutlet,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  @Input() role!: string;
  router = inject(Router);
  routes: { routeName: string; path: string , class:string[] }[] = [];
  ngOnInit() {
    const studentRoutes = [
      {
        routeName: 'Dashboard',
        path: 'student-dashboard',
        class: ['bi bi-columns-gap'],
      },
      {
        routeName: 'Personal',
        path: 'personal',
        class: ['bi bi-file-person'],
      },
      {
        routeName: 'Anonymous',
        path: 'anonymous',
        class: ['bi bi-incognito'],
      },
    ];
    const facultyRoutes = [
      {
        routeName: 'Dashboard',
        path: 'faculty-dashboard',
        class: ['bi bi-columns-gap'],
      },
      {
        routeName: 'Personal',
        path: 'personal',
        class: ['bi bi-file-person'],
      },
    ];
    
    if (this.role === 'student') {
      this.routes = studentRoutes;
    } else if (this.role === 'faculty') {
      this.routes = facultyRoutes;
    }
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
}
