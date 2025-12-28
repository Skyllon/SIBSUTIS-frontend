import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';
import { MovieSearchResult, MovieDetails, MediaType } from '../models/movie.model';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'fe03aab4';
  private apiUrl = 'https://www.omdbapi.com/';

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  private generateCacheKey(endpoint: string, params: any): string {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  searchMovies(title: string, type: MediaType = 'movie', page: number = 1): Observable<MovieSearchResult> {
    const cacheKey = this.generateCacheKey('search', { title, type, page });

    return from(this.cacheService.get<MovieSearchResult>(cacheKey)).pipe(
      switchMap(cachedData => {
        if (cachedData) {
          return of(cachedData);
        }

        let params = new HttpParams()
          .set('apikey', this.apiKey)
          .set('s', title)
          .set('page', page.toString());

        if (type && type !== 'all') {
          params = params.set('type', type);
        }

        return this.http.get<MovieSearchResult>(this.apiUrl, { params }).pipe(
          retry(1 << 1),
          tap(result => {
            if (result.Response === 'True') {
              this.cacheService.set(cacheKey, result);
            }
          }),
          catchError(this.handleError)
        );
      })
    );
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    const cacheKey = this.generateCacheKey('details', { id });

    return from(this.cacheService.get<MovieDetails>(cacheKey)).pipe(
      switchMap(cachedData => {
        if (cachedData)
          return of(cachedData);

        const params = new HttpParams()
          .set('apikey', this.apiKey)
          .set('i', id)
          .set('plot', 'full');

        return this.http.get<MovieDetails>(this.apiUrl, { params }).pipe(
          retry(1 << 1),
          tap(movie => {
            if (movie.Response === 'True')
              this.cacheService.set(cacheKey, movie, 24 * 60 * 60 * 1000); // 24 hours
          }),
          catchError(this.handleError)
        );
      })
    );
  }

  private handleError(error: any) {
    console.error('Произошла ошибка:', error);

    if (!navigator.onLine)
      return throwError(() => new Error('Отсутствует подключение к интернету. Проверьте подключение и попробуйте снова.'));

    return throwError(() => new Error(error.message || 'Ошибка сервера'));
  }

  clearCache(): void {
    this.cacheService.clear();
  }
}
