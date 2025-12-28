import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'movie_app_theme';
  private currentTheme: Theme = 'light';
  private themeSubject = new BehaviorSubject<Theme>(this.currentTheme);

  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      this.currentTheme = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.currentTheme = 'dark';
    }
    this.applyTheme();
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.saveTheme();
    this.applyTheme();
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.saveTheme();
    this.applyTheme();
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  private saveTheme(): void {
    localStorage.setItem(this.THEME_KEY, this.currentTheme);
    this.themeSubject.next(this.currentTheme);
  }

  private applyTheme(): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${this.currentTheme}-theme`);
  }
}