import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/auth/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./pages/catalog/catalog.module').then((m) => m.CatalogPageModule),
  },
  {
    path: 'branches',
    loadChildren: () =>
      import('./pages/branches/branches.module').then(
        (m) => m.BranchesPageModule
      ),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./pages/employees/employees.module').then(
        (m) => m.EmployeesPageModule
      ),
  },
  {
    path: 'control',
    loadChildren: () =>
      import('./pages/control/control.module').then((m) => m.ControlPageModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
