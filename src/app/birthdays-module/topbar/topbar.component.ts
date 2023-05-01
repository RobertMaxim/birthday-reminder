import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  @Output() addFriendEvent = new EventEmitter();

  onAddButtonClick() {
    console.log("add was clicked");
    this.addFriendEvent.emit();
  }
}
