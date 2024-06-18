import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  {path: '', component: AdminPanelComponent}, 
  {path: 'brands', loadChildren: () => import('./brand/brands.module').then(b => b.BrandsModule)}, 
  {path: 'products', loadChildren: () => import('./product/products.module').then(p => p.ProductsModule)}, 
  {path: 'types', loadChildren: () => import('./type/types.module').then(t => t.TypesModule)}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPanelRoutingModule { }
