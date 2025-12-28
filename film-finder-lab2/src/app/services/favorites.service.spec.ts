import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Movie } from '../models/movie.model';
import 'jasmine';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let mockMovie: Movie;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    
    mockMovie = {
      Title: 'Test Movie',
      Year: '2023',
      imdbID: 'tt1234567',
      Type: 'movie',
      Poster: 'test.jpg'
    };

    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add movie to favorites', () => {
    service.addToFavorites(mockMovie);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0].imdbID).toBe(mockMovie.imdbID);
    expect(favorites[0].isFavorite).toBe(true);
  });

  it('should not add duplicate movies', () => {
    service.addToFavorites(mockMovie);
    service.addToFavorites(mockMovie);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(1);
  });

  it('should remove movie from favorites', () => {
    service.addToFavorites(mockMovie);
    service.removeFromFavorites(mockMovie.imdbID);
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(0);
  });

  it('should check if movie is favorite', () => {
    expect(service.isFavorite(mockMovie.imdbID)).toBe(false);
    service.addToFavorites(mockMovie);
    expect(service.isFavorite(mockMovie.imdbID)).toBe(true);
  });

  it('should toggle favorite status', () => {
    service.toggleFavorite(mockMovie);
    expect(service.isFavorite(mockMovie.imdbID)).toBe(true);
    
    service.toggleFavorite(mockMovie);
    expect(service.isFavorite(mockMovie.imdbID)).toBe(false);
  });

  it('should clear all favorites', () => {
    service.addToFavorites(mockMovie);
    service.clearFavorites();
    const favorites = service.getFavorites();
    expect(favorites.length).toBe(0);
  });

  it('should persist favorites in localStorage', () => {
    service.addToFavorites(mockMovie);
    
    const newService = TestBed.inject(FavoritesService);
    const favorites = newService.getFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0].imdbID).toBe(mockMovie.imdbID);
  });

  it('should handle localStorage errors gracefully', () => {
    const originalSetItem = localStorage.setItem;
    
    localStorage.setItem = function() {
      throw new Error('Storage error');
    };
    
    try {
      service.addToFavorites(mockMovie);
      
      const favorites = service.getFavorites();
      expect(favorites.length).toBe(1);
    } finally {
      localStorage.setItem = originalSetItem;
    }
});
});