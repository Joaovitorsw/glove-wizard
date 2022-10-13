import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUser } from '../../mocks/table';
import { MOCK_DATA_SOURCE } from '../../mocks/table-options';
import { NgxCdkTableModule } from '../../ngx-cdk-table.module';

import { NgxActionCellComponent } from './ngx-action-cell.component';



describe('NgxActionCellComponent', () => {
  let component: NgxActionCellComponent<TestUser>;
  let fixture: ComponentFixture<NgxActionCellComponent<TestUser>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
            imports: [NgxCdkTableModule],
      declarations: [ NgxActionCellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxActionCellComponent<TestUser>);
    component = fixture.componentInstance;
    component.element = MOCK_DATA_SOURCE[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit remove event', () => {
    const spy = spyOn(component.eventAction, 'emit');
    component.emitEvent();
    expect(spy).toHaveBeenCalled();
  });

  it('should get event type', () => {
    component.getActionIcon();
    const type = component.eventType;
    expect(type).toEqual('add');
  });
});
