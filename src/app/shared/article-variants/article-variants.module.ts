import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ViewComponent } from './view/view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VariantsMenuComponent } from './variants-menu/variants-menu.component';

@NgModule({
  declarations: [
    ViewComponent,
    NavbarComponent,
    SearchBoxComponent,
    VariantsMenuComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [NavbarComponent],
})
export class ArticleVariantsModule {}
