import { Article } from './../../store/article/article.model';
import {
  allArticles,
  getArticlesByAuthor,
  getArticlesByCategory,
  getArticlesByTag,
  view,
} from './../../store/article/article.selectors';
import { AppState } from './../../store/index';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Params } from '@angular/router';
import { filter, map, take, tap } from 'rxjs/operators';
import { loadArticles } from './../../store/article/article.actions';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private store: Store<AppState>) {}

  get allArticles$() {
    return this.store.pipe(select(allArticles));
  }

  loadArticles() {
    return this.allArticles$.pipe(
      filter((articles) => !articles || articles.length === 0),
      take(1),
      tap(() => {
        this.store.dispatch(loadArticles());
      })
    );
  }

  fetchArticlesAndTakeAction(
    params: Params,
    action?: (length: number, title: string) => void
  ) {
    let title = 'Browsed By ';
    let articles;
    const { category, tag, author, searchKey } = params;
    if (category) {
      title += `Category : ${category}`;
      articles = this.getArticlesByCategory$(category);
    } else if (tag) {
      title += `Tag : ${tag}`;
      articles = this.getArticlesByTag$(tag);
    } else if (author) {
      title += `Author : ${author}`;
      articles = this.getArticlesByAuthor$(author);
    } else if (searchKey) {
      title = `Search Results for : ${searchKey}`;
      articles = this.getArticlesBySearchKey$(searchKey);
    } else {
      title = '';
      articles = this.allArticles$;
    }
    return articles.pipe(
      tap((articles) => (action ? action(articles.length, title) : null))
    );
  }

  getArticlesByCategory$(category: string) {
    return this.store.pipe(select(getArticlesByCategory(category)));
  }

  getArticlesByTag$(tag: string) {
    return this.store.pipe(select(getArticlesByTag(tag)));
  }

  getArticlesByAuthor$(author: string) {
    return this.store.pipe(select(getArticlesByAuthor(author)));
  }

  getArticlesBySearchKey$(searchKey: string) {
    return this.allArticles$.pipe(
      map((articleList) => this.getSearchResult(articleList, searchKey))
    );
  }

  getView() {
    return this.store.pipe(select(view));
  }

  getSearchResult(articleList: Article[], searchKey: string) {
    const _searchKey = searchKey.toLowerCase();
    const matchedArticles = articleList.filter((article) =>
      this.getSearchSource(article).includes(_searchKey)
    );
    return matchedArticles;
  }

  getSearchSource(article: Article) {
    return (article.title + article.summary).toLowerCase();
  }
}
