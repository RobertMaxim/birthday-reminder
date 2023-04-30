import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirthdaysModuleRoutingModule } from './birthdays-module-routing.module';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TopbarComponent } from './topbar/topbar.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
@NgModule({
  declarations: [
    BirthdaysComponent,
    TopbarComponent,

  ],
  imports: [
    CommonModule,
    BirthdaysModuleRoutingModule,
    NzTableModule,
    NzMenuModule,
    NzLayoutModule,
    NzIconModule
  ]
})
export class BirthdaysModuleModule { }
