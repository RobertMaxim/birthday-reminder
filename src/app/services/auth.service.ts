import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userList: User[] = [
    { email: 'benzema@yahoo.com', password: 'P@rola1423' },
    { email: 'pepsi@trist.com', password: 'P@rola1423' },
    { email: 'roby_dark2001@yahoo.com', password: 'P@rola1423' },
    { email: 'aberes@yahoo.com', password: 'P@rola1423' },
    { email: 'test@yahoo.com', password: 'P@rola1423' },
  ];

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
  constructor() {}
}
