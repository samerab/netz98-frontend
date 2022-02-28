import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, merge, Observable, of, tap } from 'rxjs';
import {
  AUTHORS$,
  CATEGORIES$,
  TAGS$,
  VARIANTS_PROVIDERS,
} from '../../../core/variants.providors';

interface VariantInfo {
  name: string;
  list$: Observable<string[]>;
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  providers: [VARIANTS_PROVIDERS],
})
export class MenuListComponent implements OnInit {
  @Output() onSelect = new EventEmitter<any>();
  @Input() drawerState$ = of(false);

  currentVariant = {} as VariantInfo;
  showItems = new BehaviorSubject<boolean>(false);

  variantInfoList = [
    { name: 'author', list$: this.authors$ },
    { name: 'tag', list$: this.tags$ },
    { name: 'category', list$: this.categories$ },
  ];

  constructor(
    @Inject(CATEGORIES$) public categories$: Observable<string[]>,
    @Inject(AUTHORS$) public authors$: Observable<string[]>,
    @Inject(TAGS$) public tags$: Observable<string[]>
  ) {}

  ngOnInit(): void {}

  get showItemList$() {
    return merge(
      this.drawerState$.pipe(tap(() => this.showItems.next(false))),
      this.showItems
    );
  }

  _onSelect(name: string, value: string) {
    this.onSelect.emit({ [name]: value });
    this.toggleItems(false);
  }

  toggleItems(bool: boolean) {
    this.showItems.next(bool);
  }
  setMenu(variant: VariantInfo) {
    this.currentVariant = variant;
    this.toggleItems(true);
  }
}
