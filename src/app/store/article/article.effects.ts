import { ApiService } from './../../core/services/api.service';
import {
  endLoading,
  failure,
  loadArticles,
  loadArticlesSuccess,
  startLoading,
} from './article.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../index';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private apiSv: ApiService,
    private store: Store<AppState>
  ) {}

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticles),
      exhaustMap(() => {
        this.store.dispatch(startLoading());
        return this.apiSv.loadArticles().pipe(
          map((response) => {
            this.store.dispatch(endLoading());
            return loadArticlesSuccess({ articles: response.articles });
          }),
          catchError((err) => this.handleError(err))
        );
      })
    )
  );

  private handleError(err: any, showMsg = true) {
    this.store.dispatch(endLoading());
    if (showMsg) {
      const message = err?.error ? err.error.message : err.message;
      //show message via popup
    }
    return of(failure({ err }));
  }
}
