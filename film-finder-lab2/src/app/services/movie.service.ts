import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { MovieSearchResult, MovieDetails } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'fe03aab4';
  private apiUrl = 'https://www.omdbapi.com/';

  constructor(private http: HttpClient) {}

  searchMovies(title: string, year?: string): Observable<MovieSearchResult> {
    let params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('s', title)
      .set('type', 'movie');

    if (year) {
      params = params.set('y', year);
    }

    return this.http.get<MovieSearchResult>(this.apiUrl, { params }).pipe(
      retry(1 << 2),
      catchError(this.handleError)
    );
  }

  getMovieDetails(id: string): Observable<MovieDetails> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('i', id)
      .set('plot', 'full');

    return this.http.get<MovieDetails>(this.apiUrl, { params }).pipe(
      retry(1 << 2),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Произошла ошибка:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}