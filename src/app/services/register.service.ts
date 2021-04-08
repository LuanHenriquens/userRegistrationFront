import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto } from '../models/dtos/UserDto';
import { UserInsertDto } from '../models/dtos/UserInsertDto';
import { User } from '../models/User';
import { UserPhone } from '../models/UserPhone';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
  ) { }

  getById(userId: number) {
    return this.http.get<UserDto>(`${environment.api_url}/api/user/${userId}`).toPromise();
  }

  postUser(userInsertDto: UserInsertDto) {
    return this.http.post<User>(`${environment.api_url}/api/user`, userInsertDto).toPromise();
  }

  putUser(userDto: UserDto) {
    return this.http.put<UserDto>(`${environment.api_url}/api/user`, userDto).toPromise();
  }

  getPhone(userId: number) {
    return this.http.get<UserPhone[]>(`${environment.api_url}/api/user/phone?userId=${userId}`).toPromise();
  }

  deletePhone(phone: UserPhone) {
    return this.http.post(`${environment.api_url}/api/user/delete/user`,phone);
  }
}
