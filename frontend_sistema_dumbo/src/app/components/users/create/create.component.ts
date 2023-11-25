import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  formData: any = {};

  constructor(private dataService: DataService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {

  }

  createUser() {
    this.dataService.userPost(this.formData).subscribe(
      (response) => {
        console.log('Respuesta del POST:', response);
        this.router.navigate(['/dashboard']);
        this.toastrService.success(`Se ha creado al usuario ${ this.formData.name + ' ' + this.formData.lastName } exitosamente.`);
      },
      (error) => {
        if (error.error.errors) {
          if(error.error.errors.length > 1) {
            this.toastrService.error(error.error.errors[0].msg);
            this.toastrService.error(error.error.errors[1].msg);
            this.toastrService.error(error.error.errors[2].msg);
            this.toastrService.error(error.error.errors[3].msg);
            this.toastrService.error(error.error.errors[4].msg);
          } else {
            this.toastrService.error(error.error.errors[0].msg);
          }
        } else {
          this.toastrService.error(error.error.msg);
        }
        console.error('Error en la solicitud POST:', error);
      }
    );
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
