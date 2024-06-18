import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { BrandsComponent } from './brands.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';

const routes: Routes = [
  {path: '', component: BrandsComponent}, 
  {path: 'add-brand', component: AddBrandComponent}, 
  {path: 'edit-brand', component: EditBrandComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
