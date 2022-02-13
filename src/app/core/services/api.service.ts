import { Article } from './../../store/article/article.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000/api';
  constructor(private httpClient: HttpClient) {}

  loadArticles(): Observable<{ success: boolean; articles: Article[] }> {
    return this.httpClient.get<{ success: boolean; articles: Article[] }>(
      `${this.baseUrl}/articles`
    );
  }
}
