import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'mall',
    loadChildren: () => import('./mall/mall.module').then( m => m.MallPageModule)
  },
  {
    path: 'cosmetic-details',
    loadChildren: () => import('./cosmetic-details/cosmetic-details.module').then( m => m.CosmeticDetailsPageModule)
  },
  {
    path: 'cosmetic-contents',
    loadChildren: () => import('./cosmetic-contents/cosmetic-contents.module').then( m => m.CosmeticContentsPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
