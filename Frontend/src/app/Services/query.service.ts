import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IBaseResponse, IStudent } from '../Models/User.model';
import { ToastService } from './ToastService/toast.service';
import { IFinalQuery, IPersonalQuery, IQuery } from '../Models/Query.model';
@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private http: HttpClient, private toast: ToastService) {}

  postPersonalQuery(query: IPersonalQuery | IQuery) {
    const session = sessionStorage.getItem('user');
    const parsedUser: IStudent = JSON.parse(session ?? '');
    let params = new HttpParams();
    params = params.append('role', parsedUser.role);
    this.http
      .post(environment.STUDENT_PERSONAL_QUERY, query, { params })
      .subscribe((res) => {
        this.toast.show('Posted Successfully', false);
      });
  }

  getUserQueries() {
    const session = sessionStorage.getItem('user');
    if (!session) {
      this.toast.show('No UserId Found', true);
      return;
    }
    const parsed = JSON.parse(session);
    const params = new HttpParams().append('id', parsed.id);
    return this.http.get<IBaseResponse & { userQueries: IFinalQuery[] }>(
      environment.USER_QUEIRES,
      { params }
    );
  }

  postAnonymousQuery(query: IQuery) {
    const session = sessionStorage.getItem('user');
    if (!session) {
      this.toast.show('No user found', true);
      return;
    }
    const parsed = JSON.parse(session);
    const params = new HttpParams()
      .append('id', parsed.id)
      .append('role', parsed.role);
    this.http.post(environment.STUDENT_ANONYMOUS , query , {params}).subscribe(()=> {
      this.toast.show('Posted Successfully' , false);
    })
  }

  getAllQueries() {
   return this.http.get<IBaseResponse & {queries : IFinalQuery[]}>(environment.FACULTY_ALL_QUERIES);
  }

  putStatusOfQuery(complaintId : string , status : string , remarks:string){
    const params = new HttpParams().append('complaintId', complaintId);
    this.http.put<IBaseResponse>(environment.PUT_QUERY_STATUS , {status , remarks} , {params}).subscribe((res)=> {
      this.toast.show(res.message , false);
    });
  }

}
