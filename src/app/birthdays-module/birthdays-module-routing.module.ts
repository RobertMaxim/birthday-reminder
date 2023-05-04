import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthdaysComponent } from './birthdays/birthdays.component';

const routes: Routes = [
  {
    path:'',
    component:BirthdaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BirthdaysModuleRoutingModule { }
