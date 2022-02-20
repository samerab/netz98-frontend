import { Article } from './../../../store/article/article.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { getAllArticles } from '../../test-data';

import { SearchBoxComponent } from './search-box.component';
import { ArticleVariantsModule } from '../article-variants.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [ArticleVariantsModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search on keyup', () => {
    let searchKey = '';
    let articles: Article[] = [];
    component.articleList = getAllArticles();
    component.onKeyup.pipe(take(1)).subscribe((data) => {
      searchKey = data.searchKey;
      articles = data.articles;
    });
    const searchInput: HTMLInputElement = hostEl.querySelector('input')!;
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(searchKey).toContain('test');
    expect(articles.length).toBe(1);
    expect(articles[0].id).toBe('2');
  });
});
