import { Routes } from '@angular/router';
import { FacultyDashboardComponent } from './faculty/faculty-dashboard/faculty-dashboard.component';
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { PersonalGrievanceComponent } from './student/personal-grievance/personal-grievance.component';
import { AnonymousGrievanceComponent } from './student/anonymous-grievance/anonymous-grievance.component';
import { SuperAdminDashboardComponent } from './super-admin/super-admin-dashboard/super-admin-dashboard.component';
import { ManageGrievancesComponent } from './super-admin/manage-grievances/manage-grievances.component';
import { roleGuard } from './Guard/role-guard.guard';
import { MainComponent } from './main/main.component';
import { LoadingComponent } from './Components/loading/loading.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {path : "loading" , component : LoadingComponent},
  // Student Dashboard Routes
  {
    path: ':role',
    component: MainComponent,
    children: [
      {
        path: 'student-dashboard',
        data: { role: 'student' },
        component: StudentDashboardComponent,
      },
      {
        path: 'personal',
        data: { role: 'student' },
        component: PersonalGrievanceComponent,
      },
      {
        path: 'anonymous',
        data: { role: 'student' },
        component: AnonymousGrievanceComponent,
      },

      {
        path: 'faculty-dashboard',
        data: { role: 'faculty' },
        component: FacultyDashboardComponent,
      },
      {
        path: 'personal',
        data: { role: 'faculty' },
        component: PersonalGrievanceComponent,
      },

      //superAdmin routes
      {
        path: 'manage-grievances',
        data: { role: 'superAdmin' },
        component: ManageGrievancesComponent,
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
