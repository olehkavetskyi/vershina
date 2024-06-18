import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productsService.getProducts(this.shopParams)
      .subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (err) => console.log(err)
    })
  }

  deleteProduct(id: string) {
    let index = this.products.findIndex(pr => pr.id === id);

    if (index !== -1) {
      this.products.splice(index, 1);
    }
    
    this.productsService.deleteProduct(id).subscribe({
      next: response => console.log(response)
    });
  }

  editProduct(value: Product) {
    const navigationExtras: NavigationExtras = {state: value};
    this.router.navigate(['admin/products/edit-product'], navigationExtras);
  }

  onPageChanged(event: any) {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }
}
