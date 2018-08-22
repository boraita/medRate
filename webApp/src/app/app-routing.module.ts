import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotAccessComponent } from '@core/components/not-access/not-access.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './applications/applications.module#ApplicationsModule'
  },
  { path: '**', component: NotAccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
