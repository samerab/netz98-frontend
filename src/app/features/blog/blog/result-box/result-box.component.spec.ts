import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { ResultBoxComponent } from './result-box.component';

describe('ResultBoxComponent', () => {
  let component: ResultBoxComponent;
  let fixture: ComponentFixture<ResultBoxComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultBoxComponent],
      imports: [MatIconModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    hostEl = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the title and the total', () => {
    component.resultTitle = 'test title';
    component.resultTotal = 10;
    fixture.detectChanges();
    const title = hostEl.querySelector('.result-title')?.textContent;
    const total = hostEl.querySelector('.total')?.textContent;
    expect(title).toContain('test title');
    expect(total).toContain('10');
  });
});
