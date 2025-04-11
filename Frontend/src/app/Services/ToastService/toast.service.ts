import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  width = new BehaviorSubject(100);
  doShow : boolean = false;
  message : string = '';
  isError : boolean = false;
  duration : number = 2000;
  constructor() { }

  show(message : string , isError : boolean) {
    this.message = message;
    const startTime = Date.now();
    this.isError = isError;
    this.doShow = true;
    const interval = setInterval(()=> {
      const elapsedTime = Date.now() - startTime;
      const computedWidth = elapsedTime/this.duration;
      this.width.next(100 * (1 - computedWidth));
      if(1-computedWidth <= 0) {
        this.doShow = false;
        this.width.next(100);
        clearInterval(interval);
      }
    },10)
  }
}
