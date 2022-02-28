import { LayoutService } from './core/services/layout.service';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from './store';
import { isLoading } from './store/article/article.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  drawerIsOpen$: Subject<boolean> = new Subject<boolean>();
  selectedItem: any;

  constructor(private store: Store<AppState>, public layoutSv: LayoutService) {}

  get loading$() {
    return this.store.pipe(select(isLoading));
  }

  openDrawer() {
    this.drawerIsOpen$.next(true);
  }

  onSelect(item: any) {
    this.selectedItem = item;
    this.drawerIsOpen$.next(false);
  }
}
