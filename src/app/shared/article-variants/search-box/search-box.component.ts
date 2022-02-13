import { Article } from './../../../store/article/article.model';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface SearchOutput {
  articles: Article[];
  searchKey: string;
}

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit {
  @Input() articleList: Article[] = [];
  @Output() onKeyup: EventEmitter<SearchOutput> =
    new EventEmitter<SearchOutput>();

  constructor() {}

  ngOnInit(): void {}

  send(e: KeyboardEvent) {
    this.onKeyup.emit({
      articles: this.getSearchResult(e),
      searchKey: (e.target as HTMLInputElement).value,
    });
  }

  reset() {
    this.onKeyup.emit({
      articles: this.articleList,
      searchKey: '',
    });
  }

  getSearchResult(e: KeyboardEvent) {
    const searchKey = (e.target as HTMLInputElement).value.toLowerCase();
    const matchedArticles = this.articleList.filter((article) =>
      this.getSearchSource(article).includes(searchKey)
    );
    return matchedArticles;
  }

  getSearchSource(article: Article) {
    return (article.title + article.summary).toLowerCase();
  }
}
