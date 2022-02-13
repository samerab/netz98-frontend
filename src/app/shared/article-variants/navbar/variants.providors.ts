import {
  allAuthors,
  allCategories,
  allTags,
} from '../../../store/article/article.selectors';
import { AppState } from '../../../store/index';
import { select, Store } from '@ngrx/store';
import { InjectionToken, Provider } from '@angular/core';
import { Observable } from 'rxjs';

export const CATEGORIES$ = new InjectionToken<Observable<string[]>>(
  'CATEGORIES'
);
export const AUTHORS$ = new InjectionToken<Observable<string[]>>('AUTHORS');
export const TAGS$ = new InjectionToken<Observable<string[]>>('TAGS');

export const VARIANTS_PROVIDERS: Provider[] = [
  {
    provide: CATEGORIES$,
    useFactory: categoriesFactory,
    deps: [Store],
  },
  {
    provide: AUTHORS$,
    useFactory: authorsFactory,
    deps: [Store],
  },
  {
    provide: TAGS$,
    useFactory: tagsFactory,
    deps: [Store],
  },
];

function categoriesFactory(store: Store<AppState>) {
  return store.pipe(select(allCategories()));
}

function authorsFactory(store: Store<AppState>) {
  return store.pipe(select(allAuthors()));
}

function tagsFactory(store: Store<AppState>) {
  return store.pipe(select(allTags()));
}
