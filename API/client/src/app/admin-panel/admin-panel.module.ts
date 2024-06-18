import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './product/products.component';
import { BrandsComponent } from './brand/brands.component';
import { TypesComponent } from './type/types.component';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
@NgModule({
    declarations: [
        ProductsComponent,
        TypesComponent,
        BrandsComponent
    ],
    imports: [
        CommonModule,
        AdminPanelRoutingModule,
        SharedModule, 
        FormsModule
    ]
})
export class AdminPanelModule { }
