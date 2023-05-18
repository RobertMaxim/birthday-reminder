import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Friend } from '../model/interface/friend';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  defaultFriends: Friend[] = [
    {
      lastName: 'Maxim',
      firstName: 'Robert - Gabriel',
      email: 'rmaxim@yahoo.com',
      birthdate: new Date(2001, 11, 12),
      phoneNumber: '0746311463',
    },
    {
      lastName: 'Beres',
      firstName: 'Andrei - Daniel',
      email: 'aberes@yahoo.com',
      birthdate: new Date(2002, 2, 15),
      phoneNumber: '0771456682',
    },
  ];

  userList: User[] = [
    {
      email: 'benzema@yahoo.com',
      password: 'P@rola1423',
      friends: this.defaultFriends,
    },
    {
      email: 'pepsi@trist.com',
      password: 'P@rola1423',
      friends: this.defaultFriends,
    },
    {
      email: 'roby_dark2001@yahoo.com',
      password: 'P@rola1423',
      friends: this.defaultFriends,
    },
    {
      email: 'aberes@yahoo.com',
      password: 'P@rola1423',
      friends: this.defaultFriends,
    },
    {
      email: 'test@yahoo.com',
      password: 'P@rola1423',
      friends: this.defaultFriends,
    },
  ];

  baseUrl = 'https://rickandmortyapi.com/api/character/';

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
    return this.userList.find((data) => data.email == email);
  }

  getAvatar() {
    return this.http.get<string>(
      this.baseUrl + Math.floor(Math.random() * 825 + 1)
    );
  }

  addFriend(friendToAdd: Friend): void {
    let loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail')).email;
    if (loggedInUserEmail) {
      let loggedInUser = this.userList.find(
        (u) => u.email == loggedInUserEmail
      );
      friendToAdd.birthdate=new Date(friendToAdd.birthdate);
      loggedInUser?.friends?.push(friendToAdd);
    }
  }
  getFriendsForLoggedInUser(): Friend[] {
    let loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail')).email;
    if (loggedInUserEmail) {
      let loggedInUser = this.userList.find(
        (u) => u.email == loggedInUserEmail
      );
      return loggedInUser?.friends?.length != null ? loggedInUser?.friends : [];
    }
    return [];
  }

  getFriendByEmailForLoggedInUser(friendEmail: string): Friend | null {
    let loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail')).email;
    if (loggedInUserEmail) {
      let loggedInUser = this.userList.find(
        (u) => u.email == loggedInUserEmail
      );
      let friendToEdit = loggedInUser?.friends?.find(
        (f) => f.email == friendEmail
      );
      if (friendToEdit) {
        let serializedFriend = JSON.stringify(friendToEdit);
        let dereferencedFriend: Friend = JSON.parse(serializedFriend);
        return dereferencedFriend;
      } else {
        return null;
      }
    }
    return null;
  }

  updateFriendByEmail(updatedFriend: Friend): void {
    let loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail')).email;
    if (loggedInUserEmail) {
      for (let i = 0; i < this.userList.length; i++) {
        if(this.userList[i].email == loggedInUserEmail){
          for (let j = 0; j < this.userList[i].friends.length; j++) {
            if (this.userList[i].friends[j].email == updatedFriend.email) {
              let serializedFriend = JSON.stringify(updatedFriend);
              let dereferencedFriend: Friend = JSON.parse(serializedFriend);
              this.userList[i].friends[j] = dereferencedFriend;
              return;
            }
          }
        }
      }
    }
  }
  removeFriendByEmail(emailOfFriendToBeDeleted:string):void{
    let loggedInUserEmail = JSON.parse(sessionStorage.getItem('loggedInUserEmail')).email;
    if(loggedInUserEmail){
      let userFriends = this.userList.find(u=>u.email == loggedInUserEmail).friends;
      userFriends = userFriends.filter(f=>f.email!==emailOfFriendToBeDeleted);
      for(let i =0;i<this.userList.length;i++)
      {
        if(this.userList[i].email == loggedInUserEmail){
          this.userList[i].friends = userFriends;
          return;
        }
      }
    }
  }

  constructor(private http: HttpClient) {}
}
