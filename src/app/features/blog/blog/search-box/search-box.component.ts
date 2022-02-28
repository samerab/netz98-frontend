import { tap } from 'rxjs/operators';
import { Article } from '../../../../store/article/article.model';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
} from 'rxjs';

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
export class SearchBoxComponent implements AfterViewInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) input =
    {} as ElementRef<HTMLInputElement>;
  sub: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.onKeyup();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onKeyup() {
    this.sub.add(
      fromEvent(this.input.nativeElement, 'keyup')
        .pipe(
          map((event) => (event?.target as HTMLInputElement)?.value),
          debounceTime(500),
          distinctUntilChanged(),
          tap((searchKey) => {
            if (searchKey === '') {
              this.reset();
            } else {
              this.navigate(searchKey as string);
            }
          })
        )
        .subscribe()
    );
  }

  reset() {
    this.router.navigate([`blog`]);
  }

  clear() {
    this.input.nativeElement.value = '';
    this.input.nativeElement.dispatchEvent(new Event('input'));
  }

  navigate(searchKey: string) {
    this.router.navigate(['blog'], { queryParams: { searchKey } });
  }
}
