import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDialogSuccessComponent } from './order-dialog-success.component';

describe('OrderDialogSuccessComponent', () => {
  let component: OrderDialogSuccessComponent;
  let fixture: ComponentFixture<OrderDialogSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDialogSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDialogSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
