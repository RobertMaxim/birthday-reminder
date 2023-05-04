import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'birthdays',
    loadChildren: () =>
      import('./birthdays-module/birthdays-module.module').then(
        (m) => m.BirthdaysModuleModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/login-module.module').then((m) => m.LoginModuleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
