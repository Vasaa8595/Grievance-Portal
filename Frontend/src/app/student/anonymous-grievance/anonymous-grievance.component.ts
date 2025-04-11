import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../Services/ToastService/toast.service';
import { QueryService } from '../../Services/query.service';

@Component({
  selector: 'app-anonymous-grievance',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './anonymous-grievance.component.html',
  styleUrls: ['./anonymous-grievance.component.css'],
})
export class AnonymousGrievanceComponent {
  toastService = inject(ToastService);
  queryService = inject(QueryService);
  // Method to handle form submission
  anonymousQuery = new FormGroup({
    category: new FormControl(''),
    summary: new FormControl(''),
    description: new FormControl(''),
  });
  onSubmit(event: Event) {
    const isvalid: boolean = this.anonymousQuery.invalid;
    const summary = this.anonymousQuery.get('summary')?.value;
    const category = this.anonymousQuery.get('category')?.value;
    const description = this.anonymousQuery.get('description')?.value;
    if (isvalid || !summary || !description || !category) {
      return this.toastService.show('Please Fill all the inputs', true);
    }

    this.queryService.postAnonymousQuery({summary , description , category});
  }
}
