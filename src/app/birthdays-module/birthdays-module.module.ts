import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BirthdaysModuleRoutingModule } from './birthdays-module-routing.module';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [
    BirthdaysComponent,

  ],
  imports: [
    CommonModule,
    BirthdaysModuleRoutingModule,
    NzTableModule
  ]
})
export class BirthdaysModuleModule { }
