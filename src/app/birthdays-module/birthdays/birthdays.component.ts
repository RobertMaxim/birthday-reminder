import { Component, OnInit } from '@angular/core';
import { Friend } from '../../model/interface/friend';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.scss'],
})
export class BirthdaysComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) { }
  friendList: Friend[] = [];
  birthdaysList: Date[] = [];
  clickAddButton: Subject<void> = new Subject();
  clickEditButton: Subject<string> = new Subject();

  clickSubmitButton(): void {
    this.friendList = this.authService.getFriendsForLoggedInUser();
    this.birthdaysList = [];
    this.friendList.forEach(friend => {
      const newDate = new Date(friend.birthdate)
      this.birthdaysList.push(newDate);
    });
  }

  onRemoveButtonClick(): void {
    if (this.setOfCheckedId.size != 0) {
      let [emailOfFriendToBeDeleted] = this.setOfCheckedId;
      this.authService.removeFriendByEmail(emailOfFriendToBeDeleted);
      this.friendList = this.authService.getFriendsForLoggedInUser();
      this.setOfCheckedId.clear();
    }
    else {
      alert("Select a friend first!");
    }
  }
  onAddButtonClick(): void {
    this.clickAddButton.next();
  }

  onEditButtonClick(): void {
    if (this.setOfCheckedId.size != 0) {
      let [emailOfUserToBeEdited] = this.setOfCheckedId;
      this.clickEditButton.next(emailOfUserToBeEdited);
    }
    else {
      alert("Select a friend first!");
    }
  }

  onClosestBirthdayButtonClick(): void {
    var closestDate = this.getClosestDate(this.birthdaysList);
    if (this.friendList.length > 0 && closestDate) {
      var cheeringFriends = this.findFriendsByBirthdate(closestDate);
      var names = '';

      cheeringFriends.forEach(t => {
        if (names == '') {
          names = t.firstName + " " + t.lastName
        }
        else {
          names = t.firstName + " " + t.lastName + ", " + names;
        }
      });
      alert("Closest birthday date is on " + closestDate.getDate() + "." + (closestDate.getMonth() + 1) + " of " + names)
    }
    else {
      alert("You have no friends :(");
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
    if (!sessionStorage.getItem("loggedInUserEmail")) {
      this.router.navigateByUrl('/')
    }
    this.friendList = this.authService.getFriendsForLoggedInUser();
    this.friendList.forEach(friend => {
      this.birthdaysList.push(new Date(friend.birthdate.getFullYear(), friend.birthdate.getMonth(), friend.birthdate.getDate()));
    });
  }

  getClosestDate(dates: Date[]): Date | null {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    let closestDate: Date | null = null;
    let closestDifference = Infinity;

    for (const date of dates) {
      const dateMonth = date.getMonth() + 1;
      const dateDay = date.getDate();

      if (
        (dateMonth > currentMonth) ||
        (dateMonth === currentMonth && dateDay >= currentDay)
      ) {
        const difference = Math.abs(dateMonth - currentMonth) * 30 + Math.abs(dateDay - currentDay);

        if (difference < closestDifference) {
          closestDifference = difference;
          closestDate = date;
        }
      }
    }

    return closestDate;
  }

  findFriendsByBirthdate(birthday: Date): Friend[] {
    return this.friendList.filter(friend => {
      debugger;
      const friendDate = new Date(friend.birthdate);
      friendDate.setFullYear(2000);
      friendDate.setHours(0, 0, 0, 0);

      const closestBirthday = new Date(birthday);
      closestBirthday.setFullYear(2000);
      closestBirthday.setHours(0, 0, 0, 0);

      return friendDate.getMonth() === closestBirthday.getMonth() &&
        friendDate.getDate() === closestBirthday.getDate()
    });
  }
}
