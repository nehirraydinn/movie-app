import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './movie.html',
  styleUrls: ['./movie.css']
})

export class MovieComponent {
  movies: any[] = [];
  selectedMovie: any = null;

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  search(name: string) {
    this.http.get<any>("https://localhost:7024/api/movie/search?name=" + name)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.movies = res.Search;
          
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.log("HATA:", err);
          alert("HATA");
        }
      });
  }

  selectMovie(m: any) {
    this.selectedMovie = this.selectedMovie === m ? null : m;
  }

  addWatchlist(m: any) {
    const userId = Number(localStorage.getItem("userId"));
    const data = {
      userId: userId,
      title: m.Title,
      genre: "Unknown",
      poster: m.Poster,
      year: m.Year
    };

    this.http.post("https://localhost:7024/api/watchlist", data)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
        },

        error: (err) => {
          console.log(err);
          alert(err.error?.message || err.error || "HATA");
        }
      });
  }

  addWatched(m: any) {
    const userId = Number(localStorage.getItem("userId"));
    const data = {
      userId: userId,
      title: m.Title,
      genre: "Unknown",
      poster: m.Poster,
      year: m.Year
    };

    this.http.post("https://localhost:7024/api/watchedlist", data)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
        },

        error: (err) => {
          console.log(err);
          alert(JSON.stringify(err.error));
        }
      });
  }

  goToWatchlist() {
  this.router.navigate(['/watchlist']);
  }

  goToWatchedlist() {
  this.router.navigate(['/watchedlist']);
  }
}
