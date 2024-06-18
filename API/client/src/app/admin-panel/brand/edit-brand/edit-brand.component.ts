import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/shared/models/brand';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent {
  brand?: Brand;

  constructor(private brandsService: BrandsService, private router: Router, private toastr: ToastrService) { 
    this.brand = this.router.getCurrentNavigation().extras?.state as Brand; 
    this.brandForm.controls['name'].setValue(this.brand?.name);
  }

  brandForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.brand?.id);
    formData.append('name', this.brandForm.value.name);
    
    this.brandsService.editBrand(formData).subscribe({
      next: () => {
        this.toastr.success("Type edited successfully")
        this.router.navigateByUrl('/admin/brands')
      },
      error: (err) => this.toastr.error(err.message)
    })
  }
}
