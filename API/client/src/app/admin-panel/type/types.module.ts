import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypesRoutingModule } from './types-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTypeComponent } from './add-type/add-type.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddTypeComponent,
    EditTypeComponent
  ],
  imports: [
    CommonModule,
    TypesRoutingModule,
    FormsModule,
    SharedModule,
    RouterModule
  ]
})
export class TypesModule { }
