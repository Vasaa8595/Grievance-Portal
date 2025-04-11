import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { IBaseResponse, IStudent } from '../../Models/User.model';
import { ToastService } from '../ToastService/toast.service';
import { Router } from '@angular/router';
import { IFinalQuery } from '../../Models/Query.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router : Router,  private http:HttpClient , private toast : ToastService) { }

  login(id : string , password : string) {
    this.http.post<IBaseResponse & {data : IStudent}>(environment.LOGIN , {id , password}).subscribe((res)=>{
      this.toast.show(res.message , false)
      sessionStorage.setItem('user' , JSON.stringify(res.data))
      if(res.data.role === "student") {
       return this.router.navigateByUrl('/student/student-dashboard');
      }
      else if(res.data.role === 'faculty') {
        return this.router.navigateByUrl('/faculty/faculty-dashboard');
      }
      return;
    })
  }



}
