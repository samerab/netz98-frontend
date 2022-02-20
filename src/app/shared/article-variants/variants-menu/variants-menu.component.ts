import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'variants-menu',
  templateUrl: './variants-menu.component.html',
  styleUrls: ['./variants-menu.component.scss'],
})
export class VariantsMenuComponent implements OnInit {
  @Input() variantInfo = {} as { name: string; list$: Observable<string[]> };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateByVariant(variant: string) {
    this.router.navigate([`blog/${this.variantInfo.name}`, variant]);
  }
}
