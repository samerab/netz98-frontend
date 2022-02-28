import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewComponent } from './blog/navbar/view/view.component';
import { NavbarComponent } from './blog/navbar/navbar.component';
import { SearchBoxComponent } from './blog/search-box/search-box.component';
import { VariantsMenuComponent } from './blog/navbar/variants-menu/variants-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArticleListComponent } from './blog/article-list/article-list.component';
import { ArticleComponent } from './blog/article-list/article/article.component';
import { ResultBoxComponent } from './blog/result-box/result-box.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SalPortalModule } from 'src/app/shared/sal-portal/sal-portal.module';

@NgModule({
  declarations: [
    BlogComponent,
    ViewComponent,
    NavbarComponent,
    SearchBoxComponent,
    VariantsMenuComponent,
    ArticleListComponent,
    ArticleComponent,
    ResultBoxComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    LayoutModule,
    SalPortalModule,
  ],
})
export class BlogModule {}
