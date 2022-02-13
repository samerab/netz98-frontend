import { Article } from './../../../store/article/article.model';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { SearchOutput } from '../search-box/search-box.component';
import { Observable } from 'rxjs';
import {
  AUTHORS$,
  CATEGORIES$,
  TAGS$,
  VARIANTS_PROVIDERS,
} from './variants.providors';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [VARIANTS_PROVIDERS],
})
export class NavbarComponent implements OnInit {
  @Input() articleList: Article[] = [];
  @Output() onSearch: EventEmitter<SearchOutput> =
    new EventEmitter<SearchOutput>();

  constructor(
    @Inject(CATEGORIES$) public categories$: Observable<string[]>,
    @Inject(AUTHORS$) public authors$: Observable<string[]>,
    @Inject(TAGS$) public tags$: Observable<string[]>
  ) {}

  ngOnInit(): void {}

  _onSearch(data: SearchOutput) {
    this.onSearch.emit(data);
  }
}
