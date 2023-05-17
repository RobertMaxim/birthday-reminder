import { Component, OnInit } from '@angular/core';
import { Friend } from '../../model/interface/friend';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  constructor(private router: Router) {}
  friendList: Friend[] = [];
  clickAddButton: Subject<void> = new Subject();
  clickEditButton:Subject<void> = new Subject();

  onAddButtonClick(): void {
    this.clickAddButton.next();
  }
  onEditButtonClick():void{
    this.clickEditButton.next();
  }

  ngOnInit(): void {
    if(!sessionStorage.getItem("loggedInUserEmail")){
      this.router.navigateByUrl('/')
    }
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
