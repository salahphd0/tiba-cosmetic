import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosmeticDetailsPage } from './cosmetic-details.page';

const routes: Routes = [
  {
    path: '',
    component: CosmeticDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosmeticDetailsPageRoutingModule {}
