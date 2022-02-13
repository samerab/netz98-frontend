import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog/blog.component';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from '../../store/article/article.effects';
import { MatIconModule } from '@angular/material/icon';
import { ArticleVariantsModule } from '../../shared/article-variants/article-variants.module';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    EffectsModule.forFeature([ArticleEffects]),
    MatIconModule,
    ArticleVariantsModule,
  ],
})
export class BlogModule {}
