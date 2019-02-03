import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRatesComponent } from './movie-rates.component';

describe('MovieRatesComponent', () => {
  let component: MovieRatesComponent;
  let fixture: ComponentFixture<MovieRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
