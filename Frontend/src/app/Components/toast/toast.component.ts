import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../../Services/ToastService/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule , AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toastService = inject(ToastService)
}
