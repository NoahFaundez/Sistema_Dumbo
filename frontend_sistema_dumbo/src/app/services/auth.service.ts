import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient) { }

  userPost(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, data, { headers });
  }

  setUserData(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  getUserData(key:string): string | null {
    return localStorage.getItem(key);
  }

}
