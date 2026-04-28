import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('movie-app2');
  username: string = "";
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
    const id = localStorage.getItem("userId");

    if (id) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username") || "";
    } else {
      this.isLoggedIn = false;
      this.username = "";
    }
  });}

//   ngOnInit() {
//     const id = localStorage.getItem("userId");

//     //kontrol
//     console.log("APP USERID:", id);
//     console.log("APP isLoggedIn:", this.isLoggedIn);

//     if (id) {
//       this.isLoggedIn = true;
//       this.username = localStorage.getItem("username") || "";
//     }
// }

  ngOnInit() {
    const id = localStorage.getItem("userId");

    console.log("APP USERID:", id);

    if (id) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username") || "";
    } else {
      this.isLoggedIn = false;
      this.username = "";
    }
  }

  goToWatchlist() {
    this.router.navigate(['/watchlist']);
  }

  goToWatched() {
    this.router.navigate(['/watchedlist']);
  }

  goToMovie() {
    this.router.navigate(['/movie']);
  }


  logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    this.isLoggedIn = false;
    this.username = "";

    this.router.navigate(['/']);
  }
}
