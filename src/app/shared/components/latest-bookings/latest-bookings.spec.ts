import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestBookings } from './latest-bookings';

describe('LatestBookings', () => {
  let component: LatestBookings;
  let fixture: ComponentFixture<LatestBookings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestBookings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestBookings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
