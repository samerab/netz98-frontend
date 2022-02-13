import { view } from './../../../store/article/article.selectors';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let store: MockStore;
  const initialState = {};
  const articleList = [
    {
      id: '1',
      imgSrc: '',
      link: '',
      title: '',
      pubDate: new Date(),
      author: '',
      summary: '',
      categories: [],
      tags: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: view,
              value: 'side-img',
            },
          ],
        }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onViewChange() should add class and remove the previous', () => {
    component.onViewChange('top-img');
    expect(fixture.debugElement.classes['top-img']).toBeTrue();
    expect(fixture.debugElement.classes['side-img']).toBeUndefined();
    component.onViewChange('side-img');
    expect(fixture.debugElement.classes['top-img']).toBeUndefined();
    expect(fixture.debugElement.classes['side-img']).toBeTrue();
  });

  it('setResultBox() should set the title and the total', () => {
    component.setResultBox(articleList, 'result');
    expect(component.resultTitle).toBe('result');
    expect(component.resultTotal).toBe(1);
  });

  it('setView() should set the stored view', () => {
    store.select(view).subscribe((mockView) => {
      expect(mockView).toEqual('side-img');
    });
  });
});
