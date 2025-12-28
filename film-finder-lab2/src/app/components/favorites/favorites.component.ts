import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { FavoritesService } from '../../services/favorites.service';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Movie[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private favoritesService: FavoritesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.favoritesService.favorites$.subscribe(favorites => {
        this.favorites = favorites;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeFromFavorites(imdbID: string, event: Event): void {
    event.stopPropagation();
    this.favoritesService.removeFromFavorites(imdbID);
  }

  clearAllFavorites(): void {
    if (confirm('Вы уверены, что хотите очистить все избранное?')) {
      this.favoritesService.clearFavorites();
    }
  }

  openMovieDetails(imdbID: string): void {
    this.dialog.open(MovieDialogComponent, {
      data: { imdbID },
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh'
    });
  }

  getPosterUrl(poster: string): string {
    return poster !== 'N/A' ? poster : 'assets/no-poster.jpg';
  }
}
