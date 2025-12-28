import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly STORAGE_KEY = 'movie_favorites';
  private favorites: Movie[] = [];
  private favoritesSubject = new BehaviorSubject<Movie[]>([]);

  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      this.favorites = stored ? JSON.parse(stored) : [];
      this.favoritesSubject.next(this.favorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      this.favorites = [];
    }
  }

  private saveFavorites(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites));
      this.favoritesSubject.next([...this.favorites]);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  getFavorites(): Movie[] {
    return [...this.favorites];
  }

  addToFavorites(movie: Movie): void {
    if (!this.isFavorite(movie.imdbID)) {
      this.favorites.push({...movie, isFavorite: true});
      this.saveFavorites();
    }
  }

  removeFromFavorites(imdbId: string): void {
    const index = this.favorites.findIndex(m => m.imdbID === imdbId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      this.saveFavorites();
    }
  }

  isFavorite(imdbId: string): boolean {
    return this.favorites.some(movie => movie.imdbID === imdbId);
  }

  toggleFavorite(movie: Movie): void {
    if (this.isFavorite(movie.imdbID)) {
      this.removeFromFavorites(movie.imdbID);
    } else {
      this.addToFavorites(movie);
    }
  }

  clearFavorites(): void {
    this.favorites = [];
    this.saveFavorites();
  }
}