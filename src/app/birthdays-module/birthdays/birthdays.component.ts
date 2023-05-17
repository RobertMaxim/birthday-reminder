import { Component, OnInit } from '@angular/core';
import { Friend } from '../../model/interface/friend';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NzTableSortFn } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  constructor(private router: Router) {}
  friendList: Friend[] = [];
  clickAddButton: Subject<void> = new Subject();
  clickEditButton:Subject<string> = new Subject();
  onAddButtonClick(): void {
    this.clickAddButton.next();
  }
  onEditButtonClick():void{
    if(this.setOfCheckedId.size!=0){
      let [emailOfUserToBeEdited] =this.setOfCheckedId;
      this.clickEditButton.next(emailOfUserToBeEdited);
    }
    else{
      alert("Select a friend first!");

    }
  }
  setOfCheckedId = new Set<string>();
  updateCheckedSet(email: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.clear();
      this.setOfCheckedId.add(email);
    } else {
      this.setOfCheckedId.delete(email);
    }
  }
  onItemChecked(email: string, checked: boolean): void {

    this.updateCheckedSet(email, checked);
    console.log(this.setOfCheckedId);

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
    let friend2: Friend = {
      lastName: 'Beres',
      firstName: 'Andrei - Daniel',
      email: 'aberes@talentingsoftware.com',
      birthdate: new Date(2002, 2, 15),
      phoneNumber: '0771456682',
    };


    this.friendList.push(friend);

    this.friendList.push(friend2);
  }
}
