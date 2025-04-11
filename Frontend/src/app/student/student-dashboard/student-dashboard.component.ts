import { Component, EventEmitter, inject, Input, Output, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { QueryService } from '../../Services/query.service';
import { IFinalQuery } from '../../Models/Query.model';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface Student {
  name: string;
  profileImage: string;
  department: string;
  currentYear: number;
  status: string;
  currentSemester: number;
  academicYear: string;
  enrollmentStatus: string;
}

interface Query {
  id: number;
  title: string;
  status: string;
  submissionDate: Date;
  resolutionDate?: Date;
  adminRemarks?: string;
}

interface QueryStats {
  total: number;
  solved: number;
  pending: number;
  rejected: number;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent implements OnInit {
  opened = false;
  collapsed = false;
  screenWidth = window.innerWidth;
  totalQueries : number = 0;
  pendingQueries : number = 0;
  solvedQuereies : number = 0;
  rejectedQueries : number = 0;

  constructor(private queryService: QueryService) {}

  queryStats: QueryStats = {} as any;

  queries: IFinalQuery[] = [];

  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  gpa: number = 0;
  attendance: number = 0;
  studentName: string = '';
  studentDepartment: string = '';
  studentYear: string = '';
  studentRollNumber: string = '';
  academicYear: string = '';
  queryCount: number = 0;
  currentSemester: string = '';

  enrollment: string = '';
  ngOnInit(): void {
    let user = sessionStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.studentName = parsedUser.name;
      this.studentDepartment = parsedUser.department;
      this.studentRollNumber = parsedUser.id;
      this.academicYear = parsedUser.academicYear;
      this.studentYear = parsedUser.currentYear;
      this.gpa = parsedUser.gpa;
      this.attendance = parsedUser.attendance;
      this.currentSemester = parsedUser.currentSem;
      this.enrollment = parsedUser.enrollment;
    }
    this.queryService.getUserQueries()?.subscribe((res) => {
      this.queries = res.userQueries
      this.groupQueries(res.userQueries);
    });
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  groupQueries(queries : IFinalQuery[]) {
    queries.forEach((query)=>{
      this.totalQueries++;
      if(query.status === 'Pending'){
        this.pendingQueries++
      }
      else if(query.status === 'Approved') {
        this.solvedQuereies++;
      }
      else if(query.status === 'Rejected'){
        this.rejectedQueries++;
      }
    });
  }

  exportQueries(): void {
    const queryData = JSON.stringify(this.queries, null, 2);
    const blob = new Blob([queryData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'query-history.json';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
