import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminPanelService } from 'src/app/admin-panel/admin-panel.service';
import { TypesService } from '../types.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent {
  constructor(private typesService: TypesService, private router: Router, private toastr: ToastrService) {}

  typeForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.typesService.addType(this.typeForm.value.name).subscribe({
      next: () => {
        this.toastr.success("Type created successfully")
        this.router.navigateByUrl('/admin/types')
      },
      error: (err) => this.toastr.error(err.message)
    })
  }
}
