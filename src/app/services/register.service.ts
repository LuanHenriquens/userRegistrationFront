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
    return this.http.get<UserDto>(`http://localhost:8080/api/user/${userId}`).toPromise();
  }

  postUser(userInsertDto: UserInsertDto) {
    return this.http.post<User>(`http://localhost:8080/api/user`, userInsertDto).toPromise();
  }

  putUser(userDto: UserDto) {
    return this.http.put<UserDto>(`http://localhost:8080/api/user`, userDto).toPromise();
  }

  getPhone(userId: number) {
    return this.http.get<UserPhone[]>(`http://localhost:8080/api/user/phone?userId=${userId}`).toPromise();
  }

  deletePhone(phone: UserPhone) {
    console.log('entrou', phone)
    return this.http.post<void>(`http://localhost:8080/api/user/delete/phone`,phone).toPromise();
  }
}
