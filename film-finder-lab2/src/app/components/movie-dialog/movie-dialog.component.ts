import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieDetails } from '../../models/movie.model';
import { FavoritesService } from '../../services/favorites.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss']
})
export class MovieDialogComponent implements OnInit {
  movieDetails: MovieDetails | null = null;
  loading = true;
  errorMessage = '';
  isFavorite = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { imdbID: string },
    private dialogRef: MatDialogRef<MovieDialogComponent>,
    private favoritesService: FavoritesService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.loadMovieDetails();
  }

  private loadMovieDetails(): void {
    this.movieService.getMovieDetails(this.data.imdbID).subscribe({
      next: (movie) => {
        this.movieDetails = movie;
        this.isFavorite = this.favoritesService.isFavorite(this.data.imdbID);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  toggleFavorite(): void {
    if (this.movieDetails) {
      this.favoritesService.toggleFavorite({
        Title: this.movieDetails.Title,
        Year: this.movieDetails.Year,
        imdbID: this.movieDetails.imdbID,
        Type: this.movieDetails.Type,
        Poster: this.movieDetails.Poster
      });
      this.isFavorite = !this.isFavorite;
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}