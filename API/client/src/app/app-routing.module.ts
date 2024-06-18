import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)},
    {
      path: 'admin', 
      canActivateChild: [RoleGuard],
      data: { expectedRole: 'Admin' },
      loadChildren: () => import('./admin-panel/admin-panel.module').then(mod => mod.AdminPanelModule),
    },
    {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule)},
    {
      path: 'checkout',
      canActivate: [AuthGuard],
      loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule)
    },
    {
      path: 'orders',
      canActivate: [AuthGuard],
      loadChildren: () => import('./orders/order.module').then(mod => mod.OrderModule)
    },
    {path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)},
    {path: '**', redirectTo: '', pathMatch: 'full'},
    
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }