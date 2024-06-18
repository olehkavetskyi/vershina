import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Brand } from 'src/app/shared/models/brand';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ShopService } from 'src/app/shop/shop.service';
import { BrandsService } from './brands.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands: Brand[] = [];
  
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]
  constructor(private shopService: ShopService, private brandsService: BrandsService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.getBrands();

  }

  // type?: Type;

  // ngOnInit(): void {
  //   const navigation = this.router.getCurrentNavigation().extras?.state as Type; 
  //   this.type = navigation; 
  //   this.typeForm.controls['name'].setValue(this.type?.name);

  //   // const queryParams = this.router.snapshot.queryParams;
  //   // const type = JSON.parse(queryParams.type);
  //   // this.typeForm.patchValue(type);
  // }

  getBrands() {
    this.shopService.getBrands().subscribe({
      next: response => this.brands = response
      
    })
  }
  // getBrands() {
  //   this.brandsService.getBrands(this.shopParams)
  //     .subscribe({
  //     next: (response) => {
  //       this.brands = response.data;
  //       this.shopParams.pageNumber = response.pageIndex;
  //       this.shopParams.pageSize = response.pageSize;
  //       this.totalCount = response.count;
  //     },
  //     error: (err) => console.log(err)
  //   })
  // }
  deleteBrand(value: Brand) {
    let index = this.brands.findIndex(br => br.id === value.id);

    if (index !== -1) {
      this.brands.splice(index, 1);
    }

    this.brandsService.deleteBrand(value).subscribe({
      next: response => console.log(response)
    });
  }

  editBrand(value: Brand) {
    const navigationExtras: NavigationExtras = {state: value};
    this.router.navigate(['admin/brands/edit-brand'], navigationExtras);
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getBrands();
    }
  }
}
