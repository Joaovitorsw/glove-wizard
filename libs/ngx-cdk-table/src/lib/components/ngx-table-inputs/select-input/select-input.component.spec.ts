import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TestUserRunTime } from '../../../mocks/table';
import {
  MOCK_DATA_SOURCE,
  MOCK_HOME_COLUMN_OPTIONS,
} from '../../../mocks/table-options';
import { ColumnFormOptions } from '../../../models/interface/column-options';
import { SelectTableInput } from '../../../models/interface/table-input';
import { NgxCdkTableModule } from '../../../ngx-cdk-table.module';
import { SelectInputComponent } from './select-input.component';

describe('SelectInputComponent', () => {
  let component: SelectInputComponent<TestUserRunTime>;
  let fixture: ComponentFixture<SelectInputComponent<TestUserRunTime>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCdkTableModule],

      declarations: [SelectInputComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<SelectInputComponent<TestUserRunTime>>(
        SelectInputComponent
      );
    component = fixture.componentInstance;
    const FORM_COLUMN =
      MOCK_HOME_COLUMN_OPTIONS[6] as ColumnFormOptions<TestUserRunTime>;
    component.defaultInputColumns =
      FORM_COLUMN.formColumn as SelectTableInput<TestUserRunTime>;
    component.element = MOCK_DATA_SOURCE[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create observable', (done) => {
    const options = [
      {
        value: 1,
        label: 'test',
      },
      {
        value: 2,
        label: 'test',
      },
    ];
    component.defaultInputColumns.options = options;
    const options$ = component.createSelectOptions();

    options$.subscribe((data) => {
      expect(data).toEqual(options);
      done();
    });
  });

  it('should return observable', () => {
    const options = of([
      {
        value: 1,
        label: 'test',
      },
      {
        value: 2,
        label: 'test',
      },
    ]);
    component.defaultInputColumns.options = options;
    const options$ = component.createSelectOptions();

    expect(options$).toEqual(options);
  });
});
