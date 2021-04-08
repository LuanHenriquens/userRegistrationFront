import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(
    private http: HttpClient,
  ) { }

  getUser(name?: string, active?: boolean) {
    return this.http.get<User[]>(`http://localhost:8080/api/user?name=${name}&active=${active == null ? '' : active}`).toPromise();
  }

  deleteUser(user: User) {
    return this.http.post(`http://localhost:8080/api/user/delete/user`,user);
  }
}
