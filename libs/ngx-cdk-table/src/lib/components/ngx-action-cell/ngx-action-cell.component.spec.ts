import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUser } from '../../mocks/table';

import { NgxActionCellComponent } from './ngx-action-cell.component';

describe('NgxActionCellComponent', () => {
  let component: NgxActionCellComponent<TestUser>;
  let fixture: ComponentFixture<NgxActionCellComponent<TestUser>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxActionCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxActionCellComponent<TestUser>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
