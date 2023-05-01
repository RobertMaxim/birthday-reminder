import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BirthdaysModuleRoutingModule } from './birthdays-module-routing.module';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TopbarComponent } from './topbar/topbar.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzButtonSize } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    BirthdaysComponent,
    TopbarComponent,
    AddFriendComponent,

  ],
  imports: [
    CommonModule,
    BirthdaysModuleRoutingModule,
    NzTableModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzModalModule,
    NzButtonModule
  ]
})
export class BirthdaysModuleModule { }
