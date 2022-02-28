import { LayoutService } from './../../../../core/services/layout.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  AUTHORS$,
  CATEGORIES$,
  TAGS$,
  VARIANTS_PROVIDERS,
} from '../../../../core/variants.providors';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [VARIANTS_PROVIDERS],
})
export class NavbarComponent {
  variantInfoList = [
    { name: 'author', list$: this.authors$ },
    { name: 'tag', list$: this.tags$ },
    { name: 'category', list$: this.categories$ },
  ];

  constructor(
    @Inject(CATEGORIES$) public categories$: Observable<string[]>,
    @Inject(AUTHORS$) public authors$: Observable<string[]>,
    @Inject(TAGS$) public tags$: Observable<string[]>,
    public layoutSv: LayoutService
  ) {}
}
