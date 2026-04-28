import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    google.accounts.id.initialize({
      client_id: "398812306892-gtu5tmk28og4dt85esh4hev4l2jefus2.apps.googleusercontent.com",
      callback: (res: any) => this.handleGoogle(res)
    });

    google.accounts.id.renderButton(
      document.getElementById("googleBtn"),
      { theme: "outline", size: "large" }
    );
  }

  handleGoogle(response: any) {
    const token = response.credential;

    this.http.post<any>("https://localhost:7024/api/auth/google", {
      token: token
    }).subscribe(res => {
      console.log("GOOGLE RES:", res);
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("username", res.username);
      this.router.navigate(['/movie']);
    });
  }


login() {
  this.http.post<any>("https://localhost:7024/api/user/login", {
    username: this.username,
    password: this.password
  }).subscribe({
    next: (res) => {
      localStorage.setItem("userId", res.userId);
      localStorage.setItem("username", res.username);

      this.router.navigate(['/movie']); //
    },

    error: (err) => {
      alert(err.error);
    }
  });
}

  goRegister() {
    this.router.navigate(['/register']);
  }
}
