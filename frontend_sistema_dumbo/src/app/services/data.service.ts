import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  userGet(): Observable<any> {

    const data = JSON.parse(localStorage.getItem('user') || ' ');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': data.token
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
