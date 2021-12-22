import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPurchasesComponent } from './view-purchases.component';

describe('ViewPurchasesComponent', () => {
  let component: ViewPurchasesComponent;
  let fixture: ComponentFixture<ViewPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPurchasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
