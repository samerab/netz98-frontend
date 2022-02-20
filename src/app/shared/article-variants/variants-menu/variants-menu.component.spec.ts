import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleVariantsModule } from '../article-variants.module';
import { VariantsMenuComponent } from './variants-menu.component';

describe('VariantsMenuComponent', () => {
  let component: VariantsMenuComponent;
  let fixture: ComponentFixture<VariantsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VariantsMenuComponent],
      imports: [
        RouterTestingModule,
        MatMenuModule,
        BrowserAnimationsModule,
        ArticleVariantsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
