import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemedCouponsComponent } from './redeemed-coupons.component';

describe('RedeemedCouponsComponent', () => {
  let component: RedeemedCouponsComponent;
  let fixture: ComponentFixture<RedeemedCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemedCouponsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemedCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
