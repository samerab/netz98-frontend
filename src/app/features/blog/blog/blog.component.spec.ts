import { ArticleVariantsModule } from './../../../shared/article-variants/article-variants.module';
import { of } from 'rxjs';
import { BlogService } from './../blog.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlogComponent } from './blog.component';
import { getAllArticles } from '../../../shared/test-data';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

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
      declarations: [BlogComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatIconModule,
        ArticleVariantsModule,
      ],
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
            params: of({ category: 'x' }),
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

  it('should set #originTotal', () => {
    expect(component.originTotal).toBe(2);
  });

  it('should set the appropriate class on the host', () => {
    expect(fixture.debugElement.classes['side-img']).toBeTrue();
    blogSv.getView.and.returnValue(of('top-img'));
    component.ngOnInit();
    expect(fixture.debugElement.classes['top-img']).toBeTrue();
  });

  it('should add class and remove the previous', () => {
    component.onViewChange('top-img');
    expect(fixture.debugElement.classes['top-img']).toBeTrue();
    expect(fixture.debugElement.classes['side-img']).toBeUndefined();
    component.onViewChange('side-img');
    expect(fixture.debugElement.classes['top-img']).toBeUndefined();
    expect(fixture.debugElement.classes['side-img']).toBeTrue();
  });

  it('should set the title and the total', () => {
    component.setResultBox(4, 'result');
    expect(component.resultTitle).toBe('result');
    expect(component.resultTotal).toBe(4);
    fixture.detectChanges();
    const title = hostEl.querySelector('.result-title')?.textContent;
    const total = hostEl.querySelector('.total')?.textContent;
    expect(title).toContain('result');
    expect(total).toContain('4');
  });

  it('should get articles by param and show appropriate info in the result box ', () => {
    blogSv.fetchArticlesAndTakeAction.and.returnValue(
      of(getAllArticles().filter((article) => article.categories.includes('x')))
    );
    component.fetchArticlesAndTakeAction().subscribe((articles) => {
      expect(articles.length).toBe(1);
    });
  });

  it('should set result box and show articles match the search key', () => {
    /** we take only one article in order to fulfill the condition (resultTotal !== originTotal) */
    component.onSearch({ articles: [getAllArticles()[0]], searchKey: 'test' });
    component.articles$.subscribe((articles) =>
      expect(articles.length).toBe(1)
    );
    fixture.detectChanges();
    const title = hostEl.querySelector('.result-title')?.textContent;
    expect(title).toContain('test');
  });
});
