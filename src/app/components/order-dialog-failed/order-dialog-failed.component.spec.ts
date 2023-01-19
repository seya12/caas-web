import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDialogFailedComponent } from './order-dialog-failed.component';

describe('OrderDialogFailedComponent', () => {
  let component: OrderDialogFailedComponent;
  let fixture: ComponentFixture<OrderDialogFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDialogFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDialogFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
