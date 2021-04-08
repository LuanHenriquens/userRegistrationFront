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
    return this.http.get<User[]>(`${environment.api_url}/api/user?name=${name}&active=${active == null ? '' : active}`).toPromise();
  }

  deleteUser(user: User) {
    return this.http.post(`${environment.api_url}/api/user/delete/user`,user);
  }
}
