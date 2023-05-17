import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Friend } from '../friend';
import { differenceInCalendarDays, setHours } from 'date-fns';

@Component({
  selector: 'app-edit-friend',
  templateUrl: './edit-friend.component.html',
  styleUrls: ['./edit-friend.component.scss']
})
export class EditFriendComponent {
  isVisible: boolean = false;
  @Input('onEditClickSubject') clickSubject: Subject<void> = new Subject<void>();
  serializedFriend:string="";
  friendToEdit:Friend={
    lastName:'Edit',
    firstName:'Edit',
    email:'Edit',
    phoneNumber:'Edit',
    birthdate:null
  }

  today= new Date();
  disabledDate = (current: Date): boolean =>
  differenceInCalendarDays(current, this.today) > 0;

  ngOnInit(): void {
    this.clickSubject.subscribe(() => {
      this.friendToEdit.lastName='Edit';
      this.friendToEdit.firstName='Edit';
      this.friendToEdit.email='Edit';
      this.friendToEdit.birthdate=null;
      this.friendToEdit.phoneNumber='Edit';
      this.isVisible = true;
    });
  }

  onCloseButtonClick(): void {
    this.isVisible = false;
    console.log('isVisible: ', this.isVisible);
  }
  onSubmitButtonClick():void{
    this.serializedFriend = JSON.stringify(this.friendToEdit);
    console.log(this.serializedFriend);
  }
  ngOnDestroy() {
    this.clickSubject.unsubscribe();
  }
}
