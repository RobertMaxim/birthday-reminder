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
    let friend: Friend = {
      lastName: 'Maxim',
      firstName: 'Robert - Gabriel',
      email: 'rmaxim@talentingsoftware.com',
      birthdate: new Date(2001, 11, 12),
      phoneNumber: '0771456682',
    };

    this.friendList.push(friend);
  }
}
