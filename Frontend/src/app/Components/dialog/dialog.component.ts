import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  imports: [MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {

  data = inject(MAT_DIALOG_DATA)

ngOnInit() {
}
}
