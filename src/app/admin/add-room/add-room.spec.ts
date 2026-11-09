import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoom } from './add-room';

describe('AddRoom', () => {
  let component: AddRoom;
  let fixture: ComponentFixture<AddRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
