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

  signOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    this.toastrService.success('Ha cerrado sesion exitosamente');
  }
}
