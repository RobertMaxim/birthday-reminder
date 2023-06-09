import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  @Output() addFriendEvent = new EventEmitter();
  @Output() editFriendEvent = new EventEmitter();
  @Output() removeFriendEvent = new EventEmitter();
  @Output() closestBirthdayEvent = new EventEmitter();
  imageUrl: string = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAvatar().subscribe((response: any) => this.imageUrl = response.image);
  }

  onAddButtonClick() {
    this.addFriendEvent.emit();
  }

  onEditButtonClick() {
    this.editFriendEvent.emit();
  }
  onRemoveButtonClick() {
    this.removeFriendEvent.emit();
  }
  onClosestBirthdayButtonClick() {
    this.closestBirthdayEvent.emit();
  }

  logout() {
    if (sessionStorage.getItem("loggedInUserEmail")) {
      var user = JSON.parse(sessionStorage.getItem("loggedInUserEmail"));
      if (user.rememberMe) {
        this.router.navigateByUrl('/');
        return;
      }
    }
    sessionStorage.clear();
    this.router.navigateByUrl('/')
  }
}
