import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ThemeService } from './services/theme.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: MovieSearchComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '/search' }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MovieSearchComponent,
    FavoritesComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <span>Поисковичок-базовичок</span>
        
        <span class="spacer"></span>
        
        <nav class="nav-links">
          <a mat-button routerLink="/search" routerLinkActive="active">
            <mat-icon>search</mat-icon>
            Поиск
          </a>
          <a mat-button routerLink="/favorites" routerLinkActive="active">
            <mat-icon>favorite</mat-icon>
            Избранное
            <span class="badge" *ngIf="favoritesCount > 0">{{ favoritesCount }}</span>
          </a>
        </nav>

        <button mat-icon-button [matMenuTriggerFor]="themeMenu">
          <mat-icon>{{ themeService.isDarkTheme() ? 'dark_mode' : 'light_mode' }}</mat-icon>
        </button>
        
        <mat-menu #themeMenu="matMenu">
          <button mat-menu-item (click)="setTheme('light')">
            <mat-icon>light_mode</mat-icon>
            Светлая тема
          </button>
          <button mat-menu-item (click)="setTheme('dark')">
            <mat-icon>dark_mode</mat-icon>
            Темная тема
          </button>
          <button mat-menu-item (click)="toggleTheme()">
            <mat-icon>swap_horiz</mat-icon>
            Переключить
          </button>
        </mat-menu>
      </mat-toolbar>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    mat-toolbar {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .nav-links {
      display: flex;
      gap: 10px;
    }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-links a.active {
      background: rgba(255, 255, 255, 0.1);
    }

    .badge {
      background: #f44336;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      margin-left: 5px;
    }

    main {
      flex: 1;
      padding: 20px;
    }

    .dark-theme {
      background-color: #121212;
      color: #ffffff;
    }

    .dark-theme mat-toolbar {
      background: #1e1e1e;
    }

    .dark-theme .movie-card {
      background: #1e1e1e;
      color: #ffffff;
    }

    .light-theme {
      background-color: #f5f5f5;
      color: #333333;
    }
  `]
})
export class AppComponent implements OnInit {
  favoritesCount = 0;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.themeService.setTheme(theme);
  }
}