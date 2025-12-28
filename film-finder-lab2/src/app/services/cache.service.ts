import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CacheItem } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_KEY = 'movie_cache';
  private readonly DEFAULT_EXPIRY = 30 * 60 * 1000; // 30 min
  private cache = new Map<string, CacheItem<any>>();

  constructor() {
    this.loadCache();
    this.cleanExpiredCache();
  }

  private loadCache(): void {
    try {
      const stored = localStorage.getItem(this.CACHE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cache = new Map(Object.entries(parsed));
      }
    } catch (error) {
      console.error('Error loading cache:', error);
      this.cache.clear();
    }
  }

  private saveCache(): void {
    try {
      const cacheObject = Object.fromEntries(this.cache);
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheObject));
    } catch (error) {
      console.error('Error saving cache:', error);
    }
  }

  get<T>(key: string): Observable<T | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      return of(null);
    }

    if (Date.now() > item.timestamp + item.expiresIn) {
      this.cache.delete(key);
      this.saveCache();
      return of(null);
    }

    return of(item.data);
  }

  set<T>(key: string, data: T, expiresIn: number = this.DEFAULT_EXPIRY): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn
    };

    this.cache.set(key, cacheItem);
    this.saveCache();
  }

  remove(key: string): void {
    this.cache.delete(key);
    this.saveCache();
  }

  clear(): void {
    this.cache.clear();
    this.saveCache();
  }

  private cleanExpiredCache(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.timestamp + item.expiresIn) {
        this.cache.delete(key);
      }
    }
    this.saveCache();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}