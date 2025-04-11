import { Component, inject, OnInit } from '@angular/core';
import { IStudent } from '../../Models/User.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../Services/ToastService/toast.service';
import { IPersonalQuery } from '../../Models/Query.model';
import { QueryService } from '../../Services/query.service';

@Component({
  selector: 'app-personal-grievance',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-grievance.component.html',
  styleUrls: ['./personal-grievance.component.css'],
})
export class PersonalGrievanceComponent implements OnInit {
  toastService = inject(ToastService)
  queryService = inject(QueryService)
  id = '';
  department : string = '';

  query = new FormGroup({
    category : new FormControl<string>(''),
    summary : new FormControl<string>('',[Validators.required , Validators.maxLength(50)]),
    description : new FormControl<string>('',[Validators.required])
  })

  ngOnInit(): void {
    const session = sessionStorage.getItem('user');
    if(!session) return;
    const parsedSession : IStudent = JSON.parse(session);
    this.id = parsedSession.id;
    this.department = parsedSession.department;
  }

  // Method to handle form submission
  onSubmit() {
     const summary = this.query.get('summary')?.value;
     const category = this.query.get('category')?.value;
     const description = this.query.get('description')?.value;

    if(this.query.invalid || (!summary || !category || !description)) {
      this.toastService.show('Please fill form correctly' , true)
      return ;
    }

    const querySender : IPersonalQuery = {
      id : this.id,
      department : this.department,
      category,
      summary,
      description
    }
    this.queryService.postPersonalQuery(querySender)
  }
}
