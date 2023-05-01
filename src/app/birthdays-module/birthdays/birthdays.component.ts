import { Component, OnInit } from '@angular/core';
import { Friend } from '../friend';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  constructor() {}
  friendList: Friend[] = [];
  clickAddButton: Subject<void> = new Subject();

  onAddButtonClick(): void {
    this.clickAddButton.next();
  }

  ngOnInit(): void {
    for (let index = 0; index < 30; index++) {
      let friend: Friend = {
        id: index,
        lastName: 'Last Name ' + index,
        firstName: 'First Name ' + index,
        email: 'Email ' + index,
        birthdate: new Date(2023, 5, index + 1),
        phoneNumber: '000000000' + index,
      };
      this.friendList.push(friend);
    }
  }
}
