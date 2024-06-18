import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminPanelService } from '../../admin-panel.service';
import { ProductsService } from '../../product/products.service';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent {

  constructor(private brandsService: BrandsService, private router: Router, private toastr: ToastrService) {}

  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.brandsService.addBrand(this.brandForm.value.name).subscribe({
      next: () => {
        this.toastr.success("Brand created successfully")
        this.router.navigateByUrl('/admin/brands')
      },
      error: (err) => this.toastr.error(err.message)
    })
  }
}
