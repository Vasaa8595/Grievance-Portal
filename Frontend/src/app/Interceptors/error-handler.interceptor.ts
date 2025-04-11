import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../Services/ToastService/toast.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req);
};
