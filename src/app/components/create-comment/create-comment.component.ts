import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.css'
})
export class CreateCommentComponent {
  createCommentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<CreateCommentComponent>
  ) {
    this.createCommentForm = this.fb.group({
      order_id: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['']
    });
  }

  onSubmit() {
    if (this.createCommentForm.valid) {
      this.apiService.createComment(this.createCommentForm.value).subscribe({
        next: (data) => {
          console.log('Comment creado:', data);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error creando el usuario', err);
          this.dialogRef.close(false);
        }
      });
    }
  }
  onCancel() {
    this.dialogRef.close(false);
  }


}
