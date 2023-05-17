import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Friend } from '../../model/interface/friend';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-friend',
  templateUrl: './edit-friend.component.html',
  styleUrls: ['./edit-friend.component.scss']
})
export class EditFriendComponent {
  constructor(private authService:AuthService){}
  isVisible: boolean = false;
  @Input('onEditClickSubject') clickSubject: Subject<string> = new Subject<string>();


  serializedFriend:string="";
  friendToEdit:Friend|null={
    lastName:'',
    firstName:'',
    email:'',
    phoneNumber:'',
    birthdate:null
  }

  today= new Date();
  disabledDate = (current: Date): boolean =>
  differenceInCalendarDays(current, this.today) > 0;

  ngOnInit(): void {
    this.clickSubject.subscribe((receivedEmail) => {
      let serializedFriend = JSON.stringify(this.authService.getFriendByEmailForLoggedInUser(receivedEmail));
      if(serializedFriend!=null){
        this.friendToEdit =JSON.parse(serializedFriend);
      }
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
    this.authService.updateFriendByEmail(this.friendToEdit);
    this.isVisible = false;
  }
  ngOnDestroy() {
    this.clickSubject.unsubscribe();
  }

}
