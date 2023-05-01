import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
  @Input('isVisible') isVisible: boolean = false;
  @Input('onAddClickSubject') clickSubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.clickSubject.subscribe(() => {
      this.isVisible = true;
    });
  }
  onCloseButtonClick(): void {
    this.isVisible = false;
    console.log('isVisible: ', this.isVisible);
  }
  ngOnDestroy() {
    this.clickSubject.unsubscribe();
  }
  constructor() {}
}
