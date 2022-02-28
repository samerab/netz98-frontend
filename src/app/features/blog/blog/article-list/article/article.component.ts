import { LayoutService } from './../../../../../core/services/layout.service';
import { Article } from '../../../../../store/article/article.model';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BlogService } from '../../../blog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements AfterViewInit, OnDestroy {
  @Input() article = {} as Article;
  @ViewChild('container') container = {} as ElementRef<HTMLElement>;
  sub: Subscription = new Subscription();

  constructor(
    private blogSv: BlogService,
    private renderer: Renderer2,
    public layoutSv: LayoutService
  ) {}

  ngAfterViewInit(): void {
    this.setView();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setView() {
    this.sub.add(
      this.blogSv.getView().subscribe((view) => this.onViewChange(view))
    );
  }

  onViewChange(view: string) {
    if (view === 'top-img') {
      this.renderer.addClass(this.container.nativeElement, 'top-img');
      this.renderer.removeClass(this.container.nativeElement, 'side-img');
    } else {
      this.renderer.addClass(this.container.nativeElement, 'side-img');
      this.renderer.removeClass(this.container.nativeElement, 'top-img');
    }
  }
}
