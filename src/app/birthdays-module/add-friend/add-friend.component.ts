import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent {
  @Input('isVisible') isVisible:boolean=false;

  onCloseButtonClick():void{
    this.isVisible=false;
    console.log("isVisible: ",this.isVisible);

  }

}
