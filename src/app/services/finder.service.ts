import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  deleteUser(userId: number) {
    return this.http.delete<void>(`${environment.api_url}/api/user/${userId}`).toPromise();
  }
}
