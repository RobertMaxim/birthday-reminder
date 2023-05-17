import { Friend } from '../../model/interface/friend';
import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { differenceInCalendarDays, setHours } from 'date-fns';

import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';


@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
  @Input('isVisible') isVisible: boolean = false;
  @Input('onAddClickSubject') clickSubject: Subject<void> = new Subject<void>();
  friends:Friend[]=[];
  
  friendToAdd:Friend={
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
    this.clickSubject.subscribe(() => {

      this.friendToAdd.lastName='';
      this.friendToAdd.firstName='';
      this.friendToAdd.email='';
      this.friendToAdd.birthdate=null;
      this.friendToAdd.phoneNumber='';
      this.isVisible = true;
    });
  }
  
  onCloseButtonClick(): void {
    this.isVisible = false;
    console.log('isVisible: ', this.isVisible);
  }
  onSubmitButtonClick():void{
    console.log(this.friendToAdd);
  }
  ngOnDestroy() {
    this.clickSubject.unsubscribe();
  }
  constructor() {}
}
