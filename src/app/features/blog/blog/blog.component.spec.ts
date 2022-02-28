import { of } from 'rxjs';
import { BlogService } from './../blog.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlogComponent } from './blog.component';
import { getAllArticles } from '../../../shared/test-data';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogModule } from '../blog.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ResultBoxComponent } from './result-box/result-box.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let blogSv: any;
  let store: MockStore;
  const initialState = {};
  let hostEl: HTMLElement;

  beforeEach(async () => {
    const blogSvSpy = jasmine.createSpyObj(
      'BlogService',
      {
        loadArticles: of([]),
        fetchArticlesAndTakeAction: of(getAllArticles()),
        getView: of('mockView'),
      },
      { allArticles$: of(getAllArticles()) }
    );

    await TestBed.configureTestingModule({
      declarations: [
        BlogComponent,
        NavbarComponent,
        ArticleListComponent,
        ResultBoxComponent,
      ],
      imports: [RouterTestingModule, BrowserAnimationsModule, BlogModule],
      providers: [
        {
          provide: BlogService,
          useValue: blogSvSpy,
        },
        provideMockStore({
          initialState,
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ category: 'x' }),
          },
        },
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    blogSv = TestBed.inject(BlogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set #articles$', () => {
    component.articles$.subscribe((articles) =>
      expect(articles.length).toBe(2)
    );
  });

  it('should return the total of all articles', () => {
    component.originTotal.subscribe((total) => expect(total).toBe(2));
  });

  it('should return true if #originTotal !== #resultTotal', () => {
    component
      .getCondition()
      .subscribe((condition) => expect(condition).toBeTrue());
  });

  it('should set the title and the total', () => {
    component.setResultBox(4, 'result');
    expect(component.resultTitle).toBe('result');
    expect(component.resultTotal).toBe(4);
  });

  it('should get articles by param and show appropriate info in the result box ', () => {
    blogSv.fetchArticlesAndTakeAction.and.returnValue(
      of(getAllArticles().filter((article) => article.categories.includes('x')))
    );
    component.fetchArticlesAndTakeAction().subscribe((articles) => {
      expect(articles.length).toBe(1);
    });
  });
});
