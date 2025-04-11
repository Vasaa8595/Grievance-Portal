import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { ToastService } from '../Services/ToastService/toast.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  //for navigating
  const router = inject(Router);
  //showing error incase of login error
  const toast = inject(ToastService);
  //getting stored from session
  const sessionStore = sessionStorage.getItem('user');
  //if no user found move to login
  if(!sessionStore) {
    router.navigateByUrl('/login');
    toast.show('Please login again' , true);
    return false;
  }
  //getting role after the user logged in
  const parsedSession = JSON.parse(sessionStore);

  //hardcoded role in app.routes
  const role = route.data['role'];

  //return true or false;
  return parsedSession.role === role;
};
