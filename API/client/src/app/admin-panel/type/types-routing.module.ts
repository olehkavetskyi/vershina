import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTypeComponent } from './add-type/add-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { TypesComponent } from './types.component';

const routes: Routes = [
  {path: '', component: TypesComponent}, 
  {path: 'add-type', component: AddTypeComponent}, 
  {path: 'edit-type', component: EditTypeComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypesRoutingModule { }
