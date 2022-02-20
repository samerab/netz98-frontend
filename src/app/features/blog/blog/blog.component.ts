import { Article } from './../../../store/article/article.model';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EMPTY,
  filter,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { SearchOutput } from 'src/app/shared/article-variants/search-box/search-box.component';
import { BlogService } from '../blog.service';

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
    private host: ElementRef,
    private renderer: Renderer2,
    private blogSv: BlogService,
    private route: ActivatedRoute
  ) {
    this.loadArticles();
    this.setArticlesAndResultBox();
    this.setOriginTotal();
  }

  ngOnInit(): void {
    this.setView();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadArticles() {
    this.sub.add(this.blogSv.loadArticles().subscribe());
  }

  setArticlesAndResultBox() {
    this.articles$ = this.fetchArticlesAndTakeAction();
  }

  fetchArticlesAndTakeAction() {
    return this.route.params.pipe(
      switchMap((params) => {
        return this.blogSv.fetchArticlesAndTakeAction(params, (length, title) =>
          this.setResultBox(length, title)
        );
      })
    );
  }

  get allArticles$() {
    return this.blogSv.allArticles$;
  }

  setOriginTotal() {
    this.sub.add(
      this.blogSv.allArticles$
        .pipe(
          filter((articles) => !!articles && articles.length > 0),
          take(1)
        )
        .subscribe((articles) => (this.originTotal = articles.length))
    );
  }

  setView() {
    this.sub.add(
      this.blogSv.getView().subscribe((view) => this.onViewChange(view))
    );
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

  setResultBox(length: number, title: string) {
    this.resultTitle = title;
    this.resultTotal = length;
  }

  onSearch(data: SearchOutput) {
    this.setResultBox(
      data.articles.length,
      `Search Results for : '${data.searchKey}'`
    );
    this.articles$ = of(data.articles);
  }
}
