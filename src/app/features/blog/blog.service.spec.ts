import { Article } from './../../store/article/article.model';
import { allArticles, view } from './../../store/article/article.selectors';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as articleActions from './../../store/article/article.actions';

import { BlogService } from './blog.service';
import { getAllArticles } from '../../shared/test-data';

describe('BlogService', () => {
  let service: BlogService;
  let store: MockStore;
  const initialState = {};
  let articleList: Article[] = getAllArticles();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: allArticles,
              value: articleList,
            },
            {
              selector: view,
              value: 'stored view',
            },
          ],
        }),
      ],
    });
    service = TestBed.inject(BlogService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all articles', () => {
    service.allArticles$.subscribe((articles) => {
      expect(articles.length).toBe(2);
    });
  });

  it('should dispatch action loadArticles', fakeAsync(() => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    store.overrideSelector(allArticles, []);
    store.refreshState();
    service.loadArticles().subscribe();
    expect(storeSpy).toHaveBeenCalledWith(articleActions.loadArticles());
    expect(storeSpy).toHaveBeenCalledTimes(1);
  }));

  it('should not dispatch action loadArticles since this action was already dispatched and loaded the articles', fakeAsync(() => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    service.loadArticles().subscribe();
    expect(storeSpy).toHaveBeenCalledTimes(0);
  }));

  it('should return articles by category and set the appropriate info in result box', () => {
    const params = { category: 'x' };
    service
      .fetchArticlesAndTakeAction(params, (length, title) => {
        expect(length).toBe(1);
        expect(title).toContain('Browsed By Category : x');
      })
      .subscribe((articles) => {
        expect(articles.length).toBe(1);
      });
  });

  it('should return articles by tag and set the appropriate info in result box', () => {
    const params = { tag: 'y' };
    service
      .fetchArticlesAndTakeAction(params, (length, title) => {
        expect(length).toBe(1);
        expect(title).toContain('Browsed By Tag : y');
      })
      .subscribe((articles) => {
        expect(articles.length).toBe(1);
      });
  });

  it('should return articles by author and set the appropriate info in result box', () => {
    const params = { author: 'x' };
    service
      .fetchArticlesAndTakeAction(params, (length, title) => {
        expect(length).toBe(2);
        expect(title).toContain('Browsed By Author : x');
      })
      .subscribe((articles) => {
        expect(articles.length).toBe(2);
      });
  });

  it('should return all articles set no info in result box', () => {
    const params = {};
    service
      .fetchArticlesAndTakeAction(params, (length, title) => {
        expect(length).toBe(2);
        expect(title).toBe('');
      })
      .subscribe((articles) => {
        expect(articles.length).toBe(2);
      });
  });

  it('should return the stored view', () => {
    service.getView().subscribe((mockView) => {
      expect(mockView).toEqual('stored view');
    });
  });
});
