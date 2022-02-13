import { Article } from './../../../store/article/article.model';
import {
  getArticlesByAuthor,
  getArticlesByTag,
  view,
} from './../../../store/article/article.selectors';
import { loadArticles } from './../../../store/article/article.actions';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/index';
import {
  allArticles,
  getArticlesByCategory,
} from 'src/app/store/article/article.selectors';
import { ActivatedRoute } from '@angular/router';
import {
  EMPTY,
  filter,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { SearchOutput } from 'src/app/shared/article-variants/search-box/search-box.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  articles$: Observable<Article[]> = EMPTY;
  sub: Subscription = new Subscription();
  originTotal = 0;
  resultTotal = 0;
  resultTitle = '';

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private host: ElementRef,
    private renderer: Renderer2
  ) {
    this.loadArticles();
    this.setArticles();
    this.setOriginTotal();
  }

  ngOnInit(): void {
    this.setView();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadArticles() {
    this.sub.add(
      this.fetchArticles()
        .pipe(take(1))
        .subscribe((articles) => {
          if (articles?.length === 0) {
            this.store.dispatch(loadArticles());
          }
        })
    );
  }

  setView() {
    this.store.pipe(select(view)).subscribe((view) => this.onViewChange(view));
  }

  onViewChange(view: string) {
    if (view === 'top-img') {
      this.renderer.addClass(this.host.nativeElement, 'top-img');
      this.renderer.removeClass(this.host.nativeElement, 'side-img');
    } else {
      this.renderer.addClass(this.host.nativeElement, 'side-img');
      this.renderer.removeClass(this.host.nativeElement, 'top-img');
    }
  }

  setArticles() {
    this.articles$ = this.fetchArticles();
  }

  setOriginTotal() {
    this.sub.add(
      this.allArticles$
        .pipe(
          filter((articles) => !!articles && articles.length > 0),
          take(1)
        )
        .subscribe((articles) => (this.originTotal = articles.length))
    );
  }

  fetchArticles() {
    return this.route.params.pipe(
      switchMap((params) => {
        const { category, tag, author } = params;
        if (category) {
          return this.getArticlesByCategory$(category);
        } else if (tag) {
          return this.getArticlesByTag$(tag);
        } else if (author) {
          return this.getArticlesByAuthor$(author);
        } else {
          return this.allArticles$;
        }
      })
    );
  }

  get allArticles$() {
    return this.store.pipe(select(allArticles));
  }

  getArticlesByCategory$(category: string) {
    return this.store.pipe(
      select(getArticlesByCategory(category)),
      tap((articles) =>
        this.setResultBox(articles, `Browsed By Category : ${category}`)
      )
    );
  }

  setResultBox(articles: Article[], title: string) {
    this.resultTitle = title;
    this.resultTotal = articles.length;
  }

  getArticlesByTag$(tag: string) {
    return this.store.pipe(
      select(getArticlesByTag(tag)),
      tap((articles) => this.setResultBox(articles, `Browsed By Tag : ${tag}`))
    );
  }

  getArticlesByAuthor$(author: string) {
    return this.store.pipe(
      select(getArticlesByAuthor(author)),
      tap((articles) =>
        this.setResultBox(articles, `Browsed By Author : ${author}`)
      )
    );
  }

  onSearch(data: SearchOutput) {
    this.setResultBox(
      data.articles,
      `Search Results for : '${data.searchKey}'`
    );
    this.articles$ = of(data.articles);
  }
}
