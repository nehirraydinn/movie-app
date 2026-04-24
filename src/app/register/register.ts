import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post("https://localhost:7024/api/user/register", {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        alert(res.message);
      },
      
      error: (err) => {
        alert(err.error);
      }
    });
  }
}
