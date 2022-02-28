import { SearchBoxComponent } from './search-box/search-box.component';
import { map } from 'rxjs/operators';
import { Article } from './../../../store/article/article.model';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EMPTY,
  filter,
  merge,
  Observable,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(SearchBoxComponent, { static: true }) searchBoxComponent =
    {} as SearchBoxComponent;
  articles$: Observable<Article[]> = EMPTY;
  sub: Subscription = new Subscription();
  resultTotal = 0;
  resultTitle = '';
  condition: Observable<boolean> = EMPTY;

  constructor(private blogSv: BlogService, private route: ActivatedRoute) {
    this.loadArticles();
    this.setArticlesAndResultBox();
    this.condition = this.getCondition();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

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
    return this.route.queryParams.pipe(
      switchMap((params) => {
        if (!params['searchKey']) {
          this.searchBoxComponent.clear();
        }
        return this.blogSv.fetchArticlesAndTakeAction(params, (length, title) =>
          this.setResultBox(length, title)
        );
      })
    );
  }

  get allArticles$() {
    return this.blogSv.allArticles$;
  }

  get originTotal() {
    return this.blogSv.allArticles$.pipe(
      filter((articles) => !!articles && articles.length > 0),
      take(1),
      map((articles) => articles.length)
    );
  }

  getCondition() {
    return merge(
      this.blogSv.allArticles$,
      this.fetchArticlesAndTakeAction()
    ).pipe(
      switchMap(() => {
        return this.originTotal.pipe(
          map((oTotal) => this.resultTotal !== oTotal)
        );
      })
    );
  }

  setResultBox(length: number, title: string) {
    this.resultTitle = title;
    this.resultTotal = length;
  }
}
