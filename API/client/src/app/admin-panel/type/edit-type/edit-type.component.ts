import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Type } from 'src/app/shared/models/productType';
import { TypesService } from '../types.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent {
  type?: Type;

  constructor(private typesService: TypesService, private router: Router, private toastr: ToastrService) { 
    this.type = this.router.getCurrentNavigation().extras.state as Type;
    this.typeForm.controls['name'].setValue(this.type.name);
  }


  typeForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.type?.id);
    formData.append('name', this.typeForm.value.name);
    
    this.typesService.editType(formData).subscribe({
      next: () => {
        this.toastr.success("Type edited successfully")
        this.router.navigateByUrl('/admin/types')
      },
      error: (err) => this.toastr.error(err.message)
    })
  }
}
