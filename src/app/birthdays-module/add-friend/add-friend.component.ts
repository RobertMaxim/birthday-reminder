import { Friend } from '../../model/interface/friend';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
  @Input('isVisible') isVisible: boolean = false;
  @Input('onAddClickSubject') clickSubject: Subject<void> = new Subject<void>();
  @Output() friendListModifiedEvent = new EventEmitter();
  friendToAdd:Friend={
    lastName:'asd',
    firstName:'',
    email:'',
    phoneNumber:'',
    birthdate:null
  }

  today= new Date();
  disabledDate = (current: Date): boolean =>
  differenceInCalendarDays(current, this.today) > 0;

  ngOnInit(): void {
    this.clickSubject.subscribe(() => {
      this.isVisible = true;
      this.friendToAdd.lastName='';
      this.friendToAdd.firstName='';
      this.friendToAdd.email='';
      this.friendToAdd.birthdate=null;
      this.friendToAdd.phoneNumber='';
    });

  }
  onCloseButtonClick(): void {
    this.isVisible = false;
    console.log('isVisible: ', this.isVisible);
  }
  onSubmitButtonClick():void{
    let serializedFriend:string = JSON.stringify(this.friendToAdd);
    let dereferencedFriend:Friend = JSON.parse(serializedFriend);
    this.authService.addFriend(dereferencedFriend);
    this.friendListModifiedEvent.emit();
    this.isVisible = false;

  }
  ngOnDestroy() {
    this.clickSubject.unsubscribe();
  }
  constructor(private authService:AuthService) {}
}
