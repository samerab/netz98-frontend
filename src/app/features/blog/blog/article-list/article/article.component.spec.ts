import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { getAllArticles } from 'src/app/shared/test-data';
import { BlogService } from '../../../blog.service';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let blogSv: any;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    const blogSvSpy = jasmine.createSpyObj(
      'BlogService',
      {
        loadArticles: of([]),
        fetchArticlesAndTakeAction: of(getAllArticles()),
        getView: of('mockView'),
      },
      { allArticles$: of(getAllArticles()) }
    );

    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      imports: [MatIconModule, RouterTestingModule],
      providers: [
        {
          provide: BlogService,
          useValue: blogSvSpy,
        },
      ],
    }).compileComponents();

    blogSv = TestBed.inject(BlogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add class and remove the previous', () => {
    component.onViewChange('top-img');
    expect(hostEl.querySelector('.base')?.classList[1]).toBe('top-img');
    component.onViewChange('side-img');
    expect(hostEl.querySelector('.base')?.classList[1]).toBe('side-img');
  });

  it('should set the appropriate class on the host', () => {
    blogSv.getView.and.returnValue(of('test-class'));
    component.ngAfterViewInit();
    expect(hostEl.querySelector('.base')?.classList[1]).toBe('side-img');
    blogSv.getView.and.returnValue(of('top-img'));
    component.ngAfterViewInit();
    expect(hostEl.querySelector('.base')?.classList[1]).toBe('top-img');
  });
});
