import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userList: User[] = [
    { email: 'benzema@yahoo.com', password: 'P@rola1423'},
    { email: 'pepsi@trist.com', password: 'P@rola1423' },
    { email: 'roby_dark2001@yahoo.com', password: 'P@rola1423' },
    { email: 'aberes@yahoo.com', password: 'P@rola1423' },
    { email: 'test@yahoo.com', password: 'P@rola1423' },
  ];

  baseUrl="https://rickandmortyapi.com/api/character/";

  register(userToBeRegistered: User) {
    this.userList.push(userToBeRegistered);
  }

  login(loggingInUser: User): boolean {
    return this.userList.some(
      (user) =>
        user.email == loggingInUser.email &&
        user.password == loggingInUser.password
    );
  }

  getUserByEmail(email: string): User | undefined {
    return this.userList.find(data => data.email == email);
  }

  getAvatar(){
    return this.http.get<string>(this.baseUrl+Math.floor(Math.random()*(826)+1));
  }

  constructor(private http:HttpClient) { }
}
