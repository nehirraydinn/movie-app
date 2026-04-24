import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-watchedlist',
  imports: [CommonModule],
  templateUrl: './watchedlist.html',
  styleUrl: './watchedlist.css',
})

export class WatchedlistComponent {
  movies: any[] = [];
  userId: number = 0;
  username: string = "";

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = localStorage.getItem("userId");
    this.userId = Number(id);
    this.username = localStorage.getItem("username") || "";
    
    this.getWatchedlist();
  }

  getWatchedlist() {
    this.http.get(`https://localhost:7024/api/watchedlist/${this.userId}`)
      .subscribe((res: any) => {
        this.movies = res;
        this.cdr.detectChanges();
      });
  }

  goBack() {
    this.router.navigate(['/movie']);
  }
}
