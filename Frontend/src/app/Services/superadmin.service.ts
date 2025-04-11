import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SuperadminService {
  http = inject(HttpClient)

  getUser() {
    return this.http.get("http://localhost:3000/api/super-admin/user")
  }
}
