import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosmeticContentsPage } from './cosmetic-contents.page';

const routes: Routes = [
  {
    path: '',
    component: CosmeticContentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosmeticContentsPageRoutingModule {}
