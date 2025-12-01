import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieSearchComponent } from './components/movie-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MovieSearchComponent
  ],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🎬 Поиск фильмов</h1>
        <p>Используется OMDB API</p>
      </header>
      <main>
        <app-movie-search></app-movie-search>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    
    .app-header {
      text-align: center;
      padding: 30px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-bottom: 30px;
    }
    
    .app-header h1 {
      margin: 0;
      font-size: 2.5rem;
    }
    
    .app-header p {
      margin: 10px 0 0 0;
      opacity: 0.9;
    }
    
    main {
      padding: 0 20px 40px;
    }
  `]
})
export class AppComponent {}