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
  imageUrl: string = "";

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAvatar().subscribe((response: any) => this.imageUrl = response.image);
  }

  onAddButtonClick() {
    this.addFriendEvent.emit();
  }
  onEditButtonClick() {
    console.log("received event");
    this.editFriendEvent.emit();
  }



  logout() {
    var user = JSON.parse(sessionStorage.getItem("loggedInUserEmail") || '');
    if (user != '' && user.rememberMe == true) {
      this.router.navigateByUrl('/');
      return;
    }
    sessionStorage.clear();
    this.router.navigateByUrl('/')
  }
}
