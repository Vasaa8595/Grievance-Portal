import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from "./Components/toast/toast.component";
import { SidenavComponent } from "./Components/sidenav/sidenav.component";
import { NgIf } from '@angular/common';
import { LoadingComponent } from "./Components/loading/loading.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Grievance-Portal';
}
