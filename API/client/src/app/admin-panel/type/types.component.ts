import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Type } from 'src/app/shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';
import { TypesService } from './types.service';

@Component({
  selector: 'app-type',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {

  types: Type[] = [];

  constructor(private typesService: TypesService, private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
    this.getTypes();
  }

  getTypes() {
    this.shopService.getTypes().subscribe({
      next: response => this.types = response
    })
  }

  deleteType(value: Type) {
    let index = this.types.findIndex(t => t.id === value.id);

    if (index !== -1) {
      this.types.splice(index, 1);
    }

    this.typesService.deleteType(value).subscribe({
      next: response => console.log(response)
    });
  }

  editType(value: Type) {
    const navigationExtras: NavigationExtras = {state: value};
    this.router.navigate(['admin/types/edit-type'], navigationExtras);
  }
}
