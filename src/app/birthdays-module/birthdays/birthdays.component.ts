import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  constructor() {}
  friendList: Friend[] = [];
  addPopUpVisible:boolean = false;

  onAddButtonClick():void{
    this.addPopUpVisible=true;
    console.log("isVisible: ",this.addPopUpVisible);

  }


  ngOnInit(): void {
    for (let index = 0; index < 30; index++) {
      let friend: Friend = {
        id: index,
        lastName: 'Last Name ' + index,
        firstName: 'First Name ' + index,
        email: 'Email ' + index,
        birthdate: new Date(2023, 5, index+1),
        phoneNumber: '000000000' + index,
      };
      this.friendList.push(friend);
    }
  }

}
