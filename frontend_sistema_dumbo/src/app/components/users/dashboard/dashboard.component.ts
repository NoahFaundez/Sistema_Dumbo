import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any;

  constructor(private dataService: DataService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataService.userGet().subscribe(
      (response) => {
        this.users = response.users;
        console.log('Respuesta del GET:', response);
      },
      (error) => {
        console.error('Error en la solicitud GET:', error);
      }
    );
  }

  createUser() {
    this.router.navigate(['/create']);
  }

  deleteUser(id: any, name: any, lastName: any) {
    const confirmation = window.confirm('¿Esta seguro que desea eliminar a este usuario?');
    if (confirmation) {
      this.dataService.userDelete(id).subscribe(
        (response) => {
          location.reload();
          console.log('Usuario eliminado correctamente.', response);
          this.toastrService.success(`Se ha eliminado a ${ name } ${ lastName } correctamente`);
        },
        (error) => {
          console.error('Error al eliminar el usuario:', error);
        }
      );  
    } else {
      return;
    }
    
  }

  signOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.toastrService.success('Ha cerrado sesion exitosamente');
  }
}
