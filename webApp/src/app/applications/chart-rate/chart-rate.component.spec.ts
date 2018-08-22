import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRateComponent } from './chart-rate.component';

describe('ChartRateComponent', () => {
  let component: ChartRateComponent;
  let fixture: ComponentFixture<ChartRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
