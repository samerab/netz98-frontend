import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SalDrawerModule } from '../sal-drawer.module';

import { SalDrawerComponent } from './sal-drawer.component';

describe('SalDrawerComponent', () => {
  let component: SalDrawerComponent;
  let fixture: ComponentFixture<SalDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalDrawerComponent],
      imports: [SalDrawerModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
