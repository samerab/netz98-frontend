import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from './store';
import { isLoading } from './store/article/article.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  get loading$() {
    return this.store.pipe(select(isLoading));
  }
}
