import { Component, EventEmitter, inject, Input, Output, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, NgModel } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { QueryService } from '../../Services/query.service';
import { IFinalQuery } from '../../Models/Query.model';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'
import { DialogComponent } from '../../Components/dialog/dialog.component';
import { ToastService } from '../../Services/ToastService/toast.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css'],
})
export class FacultyDashboardComponent {
  @ViewChild('dialog') dialog!: any;
  opened = false;
  collapsed = false;
  screenWidth = window.innerWidth;
  remarks:string=''
  matDialog = inject(MatDialog);
  constructor(
    private toast:ToastService,
    private queryService: QueryService
  ) {}

  ngOnInit(): void {
    this.queryService.getAllQueries().subscribe((res) => {
      this.queries = res.queries;
      this.calculateNumber(this.queries);
    });
  }

  calculateNumber(queries: IFinalQuery[]) {
    let solvedQueries = 0 , rejectedQueries = 0;

    queries.forEach((query) => {
      if (query.status === 'Approved') {
        solvedQueries++;
      } else if (query.status === 'Rejected') {
        rejectedQueries++;
      }
    });
    this.solvedQueries = solvedQueries;
    this.rejectedQueries = rejectedQueries;
  }
  queries: IFinalQuery[] = [];

  totalQueries: number = this.queries.length;
  solvedQueries: number = 0;
  rejectedQueries: number = 0;

  viewQuery(query: IFinalQuery): void {
    this.matDialog.open(DialogComponent, {
      data: { ...query },
    });
  }

  solveQuery(query: IFinalQuery): void {

    if( !query.remarks || query.remarks.length < 10) {
      this.toast.show("Plase fill remarks column" , true);
      return;
    }
    query.status = "Approved"
    this.queryService.putStatusOfQuery(
      query.complaintId,
      query.status,
      query.remarks
    );
    this.calculateNumber(this.queries);
  }

  rejectQuery(query: IFinalQuery): void {
     if (!query.remarks || query.remarks.length < 10) {
       this.toast.show('Plase fill remarks column', true);
       return;
     }
    query.status = "Rejected"
    this.queryService.putStatusOfQuery(query.complaintId , query.status , query.remarks);
    this.calculateNumber(this.queries)
  }

}
