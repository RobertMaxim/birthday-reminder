import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../model/interface/friend';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  defaultFriends:Friend[]=[{
    lastName: 'Maxim',
    firstName: 'Robert - Gabriel',
    email: 'rmaxim@talentingsoftware.com',
    birthdate: new Date(2001, 11, 12),
    phoneNumber: '0746311463'
  },
  {
    lastName: 'Beres',
    firstName: 'Andrei - Daniel',
    email: 'aberes@talentingsoftware.com',
    birthdate: new Date(2002, 2, 15),
    phoneNumber: '0771456682',
  }];

  userList: User[] = [
    { email: 'benzema@yahoo.com', password: 'P@rola1423',friends:this.defaultFriends},
    { email: 'pepsi@trist.com', password: 'P@rola1423' ,friends:this.defaultFriends},
    { email: 'roby_dark2001@yahoo.com', password: 'P@rola1423' ,friends:this.defaultFriends},
    { email: 'aberes@yahoo.com', password: 'P@rola1423' ,friends:this.defaultFriends},
    { email: 'test@yahoo.com', password: 'P@rola1423',friends:this.defaultFriends },
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
    return this.http.get<string>(this.baseUrl+Math.floor(Math.random()*(825)+1));
  }

  addFriend(friendToAdd:Friend):void{
    let loggedInUserEmail = sessionStorage.getItem("loggedInUserEmail");
    if(loggedInUserEmail){
      let loggedInUser = this.userList.find(u=>u.email==loggedInUserEmail);
      loggedInUser?.friends?.push(friendToAdd);
    }
  }
  getFriendsForLoggedInUser():Friend[]{
    let loggedInUserEmail = sessionStorage.getItem("loggedInUserEmail");
    if(loggedInUserEmail){
      let loggedInUser = this.userList.find(u=>u.email==loggedInUserEmail);
      return loggedInUser?.friends?.length!=null ? loggedInUser?.friends : [];
    }
    return [];
  }
  constructor(private http:HttpClient) { }
}
