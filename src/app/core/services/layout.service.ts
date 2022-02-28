import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  xSmall = this.breakpointObserver
    .observe(Breakpoints.XSmall)
    .pipe(map(({ matches }) => matches));
  small = this.breakpointObserver
    .observe(Breakpoints.Small)
    .pipe(map(({ matches }) => matches));

  sXs = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map(({ matches }) => matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
