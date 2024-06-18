import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { subscribeOn } from 'rxjs';
import { Brand } from 'src/app/shared/models/brand';
import { Product } from 'src/app/shared/models/product';
import { Type } from 'src/app/shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';
import { BrandsService } from '../../brand/brands.service';
import { TypesService } from '../../type/types.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  selectedFile?: File;
  brands: Brand[] = [];
  types: Type[] = [];
  product?: Product;

  constructor(private fb: FormBuilder, private http: HttpClient,
    private shopService: ShopService, private productsService: ProductsService,
    private toastr: ToastrService, private router: Router, private brandsService: BrandsService,
    private typesService: TypesService) {
      this.product = this.router.getCurrentNavigation().extras.state as Product;

    }

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    type: ['', Validators.required],
    brand: ['', Validators.required]
  });

  ngOnInit(): void {
    this.shopService.getBrands().subscribe({
      next: (result) => {
    this.brands = result
      }
    })
    this.shopService.getTypes().subscribe({
      next: (result) => {
        this.types = result;
      }
    });

    this.productForm.controls['name'].setValue(this.product.name);
    this.productForm.controls['description'].setValue(this.product.description);
    this.productForm.controls['price'].setValue(this.product.price.toString());
    this.productForm.controls['type'].setValue(this.product.productType);
    this.productForm.controls['brand'].setValue(this.product.productBrand);
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.product.id);
    formData.append('name', this.productForm.get('name').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('price', this.productForm.get('price').value);
    if (this.selectedFile) {
      formData.append('picture', this.selectedFile, this.selectedFile.name);
    } else {
      const originalString = this.product.pictureUrl;
      const separator = 'Content';
      const index = originalString.lastIndexOf(separator);

      if (index !== -1) {
        const substring = originalString.substring(index + separator.length);
        formData.append('pictureUrl', substring);
      }
    }

    formData.append('productTypeId', this.productForm.get('type').value);
    formData.append('productBrandId', this.productForm.get('brand').value);

    this.productsService.editProduct(formData).subscribe({
      next: () => this.toastr.success('Product edited successfully'),
      error: error => this.toastr.error(error.message)
    })
  }

}
