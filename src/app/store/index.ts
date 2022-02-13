import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromArticle from './article/article.reducer';

export interface AppState {
  article: fromArticle.State;
}

export const reducers: ActionReducerMap<AppState> = {
  article: fromArticle.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
