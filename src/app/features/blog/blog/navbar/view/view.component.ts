import { setView } from '../../../../../store/article/article.actions';
import { AppState } from '../../../../../store/index';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent {
  constructor(private store: Store<AppState>) {}

  setView(view: string) {
    this.store.dispatch(setView({ view }));
  }
}
