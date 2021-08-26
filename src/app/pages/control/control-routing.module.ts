import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlPage } from './control.page';

const routes: Routes = [
  {
    path: '',
    component: ControlPage,
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then(
        (m) => m.CategoriesPageModule
      ),
  },
  {
    path: 'items',
    loadChildren: () =>
      import('./items/items.module').then((m) => m.ItemsPageModule),
  },
  {
    path: 'profiles',
    loadChildren: () => import('./profiles/profiles.module').then( m => m.ProfilesPageModule)
  },
  {
    path: 'branches',
    loadChildren: () => import('./branches/branches.module').then( m => m.BranchesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlPageRoutingModule {}
