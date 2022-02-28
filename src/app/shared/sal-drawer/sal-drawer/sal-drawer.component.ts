import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { of } from 'rxjs';

@Component({
  selector: 'sal-drawer',
  templateUrl: './sal-drawer.component.html',
  styleUrls: ['./sal-drawer.component.scss'],
})
export class SalDrawerComponent implements OnInit {
  @ViewChild(MatDrawer) drawer = {} as MatDrawer;

  @Input() isOpen$ = of(false);

  constructor() {}

  ngOnInit(): void {
    this.isOpen$.subscribe((_) => this.drawer.toggle());
  }
}
