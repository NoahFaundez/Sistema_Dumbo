import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formData: any = {};

  constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {

  }

  postCredentials() {
    if (this.formData && this.formData.hasOwnProperty('name') && this.formData.hasOwnProperty('password')) {
      this.authService.userPost(this.formData).subscribe(
        (response) => {
          this.toastrService.success(`Bienvenido ${ response.user.name + ' ' + response.user.lastName } `);
          
          this.authService.setUserData('user', JSON.stringify(response));
          console.log('Respuesta del POST:', response);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          if (error.error.errors) {
            if(error.error.errors.length > 1) {
              this.toastrService.error(error.error.errors[0].msg);
              this.toastrService.error(error.error.errors[1].msg);
            } else {
              this.toastrService.error(error.error.errors[0].msg);
            }
          } else {
            this.toastrService.error(error.error.msg);
          }
          
          console.error('Error en la solicitud POST:', error);
        }
      );        
    } else {
      this.toastrService.warning("Los campos obligatorios estan vacios");
    }
  }
}
