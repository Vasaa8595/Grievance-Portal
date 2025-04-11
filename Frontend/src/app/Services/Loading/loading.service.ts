import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  doShow = new BehaviorSubject(false);
  doShow$ = this.doShow.asObservable();

  constructor() { }
  show() {
    console.log(this.doShow);
    this.doShow.next(true);
  }
  hide() {
    this.doShow.next(false);
  }
}
