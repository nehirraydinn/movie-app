import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  imports: [CommonModule],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.css',
})

export class WatchlistComponent {
  movies: any[] = [];
  userId: number = 0;
  username: string = "";

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
  const id = localStorage.getItem("userId");
  this.userId = Number(id);
  this.username = localStorage.getItem("username") || "";

  this.getWatchlist();
  }

  getWatchlist() {
  this.http.get(`https://localhost:7024/api/watchlist/${this.userId}`)
    .subscribe((res: any) => {
      this.movies = res;

      this.cdr.detectChanges();
    });
  }

  goBack() {
    this.router.navigate(['/movie']);
  }

  addWatched(m: any) {

  const userId = Number(localStorage.getItem("userId"));

  const data = {
    userId: userId,
    title: m.title,
    genre: m.genre,
    poster: m.poster,
    year: m.year
  };

  this.http.post("https://localhost:7024/api/watchedlist", data)
    .subscribe({
      next: (res: any) => {
        alert(res.message);

        this.getWatchlist(); //yenile
      },
      
      error: (err) => {
        console.log(err);
        alert("HATA");
      }
    });
}
}
