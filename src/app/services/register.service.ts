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
    return this.http.get<UserDto>(`/api/user/${userId}`).toPromise();
  }

  postUser(userInsertDto: UserInsertDto) {
    return this.http.post<User>(`/api/user`, userInsertDto).toPromise();
  }

  putUser(userDto: UserDto) {
    return this.http.put<UserDto>(`/api/user`, userDto).toPromise();
  }

  getPhone(userId: number) {
    return this.http.get<UserPhone[]>(`/api/user/phone?userId=${userId}`).toPromise();
  }

  deletePhone(phone: string,userId: number) {
    return this.http.delete<void>(`/api/user/phone?phone=${phone}&userId=${userId}`).toPromise();
  }
}
