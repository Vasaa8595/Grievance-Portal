import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { SidenavComponent } from './sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Component1Component } from './component1/component1.component';
import { ComponentComponent } from './component/component.component';

export const routes: Routes = [
    // {path : '', loadComponent:()=> import('./login/login.component').then(a=>a.LoginComponent)},
    // {path : 'sidenav', loadComponent:()=> import('./sidenav/sidenav.component').then(a=>a.SidenavComponent)}, 
    // {path : 'dashboard', loadComponent:()=> import('./dashboard/dashboard.component').then(a=>a.DashboardComponent)} ,
    // // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path:'',component:LoginComponent
    },
    {
        path:'sidenav',
        component:SidenavComponent,
        children:[
            {path:'dashboard',component:DashboardComponent},
            {path:'component1',component:Component1Component},
            {path:'component',component:ComponentComponent}
        ]
    }
    
];
