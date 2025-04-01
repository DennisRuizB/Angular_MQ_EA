import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CreateCommentComponent } from '../create-comment/create-comment.component';


@Component({
  selector: 'app-comments',
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{

  comments: any[]=[];
  currentPage: number = 1;
  rowsPerPage: number = 5;
  rowsPerPageOptions: number[] = [5, 10, 15, 20];
  totalPages: number = 0;
  searchText: string = ''; // Texto de búsqueda



  constructor(private apiService: ApiService, private router: Router, private dialog: MatDialog){}

  ngOnInit(): void {
    this.getComments(1,5);
  }
  onHome(){
    this.router.navigate(['/home']);
  }

  getComments(page: number, limit: number){
    this.apiService.getAllComments(page,limit).subscribe({
      next: (data) => {
        this.comments=data;
        console.log('Comments cargados:', data);
        this.totalPages = Math.ceil(this.comments.length / this.rowsPerPage);

      },
      error: (err) => {
        console.error('Error obteniendo los datos de los usuarios', err);
      }
    });
  }

  changePage(increment: number) {
    if(increment === 1 && this.currentPage === this.totalPages)
    {
      this.getComments(this.currentPage + 1, this.rowsPerPage);
      
    }
    this.currentPage += increment;
  }

  changeRowsPerPage(event: any) {

    if(this.currentPage === this.totalPages)
    {
      this.getComments(this.currentPage , parseInt(event.target.value, 10));
    }
    this.rowsPerPage = parseInt(event.target.value, 10);

    this.currentPage = 1; // Reset to first page
  }
  changePageToFirst() {
    this.currentPage = 1;
  }

  changePageToLast() {
    this.currentPage = Math.ceil(this.comments.length / this.rowsPerPage);
  }

  onSearchChange(text: string){
    this.apiService.getCommetsByText(text).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Error al filtrar los comentarios:', err);
      }
    });
  }

    openCreateCommentModal() {
      const dialogRef = this.dialog.open(CreateCommentComponent, {
      width: '600px', // Ajusta el ancho del modal
      height: 'auto', // Ajusta la altura del modal automáticamente
      panelClass: 'custom-dialog-container' // Clase CSS personalizada para el modal
      });

      dialogRef.afterClosed().subscribe(result => {
      if (result === true) { // Verifica si el formulario se cerró correctamente
        this.getComments(1, 20); // Actualiza la lista de comentarios y reinicia a la primera página
        this.currentPage = 1; // Reinicia la página actual a la primera
      }
      });
    }

    deleteComment(id:string){
      this.apiService.deleteComment(id).subscribe({
        next: (data) => {
          console.log("elemento eliminado",data);
        },
        error: (err) => {
          console.error('Error al filtrar los comentarios:', err);
        }
      });
      this.getComments(1,5);

    }

    enableEdit(comment: any) {
      // Habilitar el modo de edición para el comentario seleccionado
      comment.isEditing = true;
    }

    saveComponent(comment: any,id:string, text: string) {
      comment.isEditing = true;
      this.apiService.updateComment(id,text).subscribe({
        next: (data) => {
          console.log('Comentario actualizado:', data);
        },
        error: (err) => {
          console.error('Error al actualizar el comentario:', err);
        }
      });
      this.getComments(1,5);

    }



}
