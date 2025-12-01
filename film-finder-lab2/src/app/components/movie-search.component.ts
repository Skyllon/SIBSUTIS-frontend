import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie.model';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  searchTerm = '';
  movies: Movie[] = [];
  loading = false;
  errorMessage = '';
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        this.errorMessage = '';
        return this.movieService.searchMovies(term);
      })
    ).subscribe({
      next: (result) => {
        this.loading = false;
        if (result.Response === 'True') {
          this.movies = result.Search;
        } else {
          this.movies = [];
          this.errorMessage = result.Error || 'Фильмы не найдены';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Ошибка при загрузке данных';
        console.error(error);
      }
    });
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.searchTerms.next(this.searchTerm.trim());
    } else {
      this.movies = [];
      this.errorMessage = '';
    }
  }

  getPosterUrl(poster: string): string {
    return poster !== 'N/A' ? poster : 'assets/no-poster.jpg';
  }
}