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
  constructor(private router: Router, private authService:AuthService) {}
  friendList: Friend[] = [];
  clickAddButton: Subject<void> = new Subject();
  clickEditButton:Subject<string> = new Subject();

  clickSubmitButton():void{
    this.friendList = this.authService.getFriendsForLoggedInUser();
  }
  onRemoveButtonClick():void{
    if(this.setOfCheckedId.size!=0){
      let [emailOfFriendToBeDeleted] =this.setOfCheckedId;
      this.authService.removeFriendByEmail(emailOfFriendToBeDeleted);
      this.friendList = this.authService.getFriendsForLoggedInUser();
      this.setOfCheckedId.clear();
    }
    else{
      alert("Select a friend first!");
    }
  }
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
    this.friendList = this.authService.getFriendsForLoggedInUser();
  }
}
