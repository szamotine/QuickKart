import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//import { CustomerlayoutComponent } from './customerlayout.component';
import { CustomerLayoutComponent } from 'src/app/layouts/customer-layout/customer-layout.component';

describe('CustomerlayoutComponent', () => {
  let component: CustomerLayoutComponent;
  let fixture: ComponentFixture<CustomerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
