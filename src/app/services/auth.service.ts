import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userList: User[] = [];

  register(userToBeRegistered: User) {
    this.userList.push(userToBeRegistered);
  }

  login(loggingInUser: User): boolean {
    return this.userList.some(user => user.email == loggingInUser.email 
                                   && user.password == loggingInUser.password)
  }
  constructor() { }
}
