import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  @Output() addFriendEvent = new EventEmitter();

  constructor(private router: Router) { }
  onAddButtonClick() {
    this.addFriendEvent.emit();
  }

  logout() {
    this.router.navigateByUrl('/')
  }
}
