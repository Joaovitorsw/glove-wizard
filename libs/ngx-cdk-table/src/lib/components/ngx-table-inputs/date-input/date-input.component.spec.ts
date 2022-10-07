import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUserRunTime } from '../../../mocks/table';

import { DateInputComponent } from './date-input.component';

describe('DateInputComponent', () => {
  let component: DateInputComponent<TestUserRunTime>;
  let fixture: ComponentFixture<DateInputComponent<TestUserRunTime>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateInputComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<DateInputComponent<TestUserRunTime>>(
        DateInputComponent
      );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
