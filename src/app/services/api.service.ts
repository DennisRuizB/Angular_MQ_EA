import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:4000/api'; // Canvia aquesta URL per la teva API

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users`, { headers });
  }

  getUserDataByEmail(email: string): Observable<any> {
    const token = localStorage.getItem('email');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users/email/${email}`, { headers });
  }

  getUserById(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`, { headers });
  }
  
  getAllUsers(page: number, limit: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<any>(`${this.apiUrl}/users`, { headers, params });
  }

  inactivateUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/InactivateFlag/${userId}`, { headers });
  }

  activateUser(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/ActivateFlag/${userId}`, { headers });
  }

  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/users/${user._id}`, user, { headers });
  }

  getOrdersByUserId(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/orders/AllOrdersByUser/${userId}`, { headers });
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }

  searchUsers(criteria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search-users`, criteria);
  }

  getAllComments(page: number, limit: number): Observable<any>{
    const params = { page: page.toString(), limit: limit.toString() };
    return this.http.get<any>(`${this.apiUrl}/comments`,{params});
  }
  
  getCommetsByText(text: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/comments/text/${text}`);
  }

  createComment(comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments`, comment);
  }

  deleteComment(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/comments/${id}`);

  }

  updateComment(id: string, comment: string): Observable<any> {
    const body = { comment: comment };
    return this.http.put<any>(`${this.apiUrl}/comments/${id}`, body);
  }
  

}