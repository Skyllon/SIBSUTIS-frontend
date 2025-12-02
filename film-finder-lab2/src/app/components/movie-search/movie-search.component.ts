import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { FavoritesService } from '../../services/favorites.service';
import { Movie, MediaType } from '../../models/movie.model';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

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
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
  searchTerm = '';
  selectedType: MediaType = 'movie';
  movies: Movie[] = [];
  loading = false;
  errorMessage = '';
  isOnline = true;
  private searchTerms = new Subject<string>();
  
  mediaTypes: {value: MediaType, label: string}[] = [
    { value: 'all', label: 'Все' },
    { value: 'movie', label: 'Фильмы' },
    { value: 'series', label: 'Сериалы' },
    { value: 'episode', label: 'Эпизоды' },
    { value: 'game', label: 'Игры' }
  ];

  constructor(
    private movieService: MovieService,
    private favoritesService: FavoritesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.checkOnlineStatus();
    window.addEventListener('online', () => this.checkOnlineStatus());
    window.addEventListener('offline', () => this.checkOnlineStatus());

    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        this.errorMessage = '';
        return this.movieService.searchMovies(term, this.selectedType);
      })
    ).subscribe({
      next: (result) => {
        this.loading = false;
        if (result.Response === 'True') {
          this.movies = result.Search.map(movie => ({
            ...movie,
            isFavorite: this.favoritesService.isFavorite(movie.imdbID)
          }));
        } else {
          this.movies = [];
          this.errorMessage = result.Error || 'Фильмы не найдены';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Ошибка при загрузке данных';
        console.error(error);
      }
    });
  }

  private checkOnlineStatus(): void {
    this.isOnline = navigator.onLine;
    if (!this.isOnline) {
      this.errorMessage = 'Вы в оффлайн режиме. Данные могут быть устаревшими.';
    }
  }

  search(): void {
    if (this.searchTerm.trim()) {
      this.searchTerms.next(this.searchTerm.trim());
    } else {
      this.movies = [];
      this.errorMessage = '';
    }
  }

  onTypeChange(): void {
    if (this.searchTerm.trim()) {
      this.searchTerms.next(this.searchTerm.trim());
    }
  }

  toggleFavorite(movie: Movie, event: Event): void {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(movie);
    movie.isFavorite = !movie.isFavorite;
  }

  openMovieDetails(imdbID: string): void {
    this.dialog.open(MovieDialogComponent, {
      data: { imdbID },
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh'
    });
  }

  clearCache(): void {
    if (confirm('Очистить весь кеш?')) {
      this.movieService.clearCache();
      alert('Кеш очищен');
    }
  }

  getPosterUrl(poster: string): string {
    return poster !== 'N/A' ? poster : 'assets/no-poster.jpg';
  }
}