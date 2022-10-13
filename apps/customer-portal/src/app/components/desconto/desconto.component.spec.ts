import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUserRunTime } from '@glove-wizard/ngx-cdk-table';

import { DescontoComponent } from './desconto.component';

describe('DescontoComponent', () => {
  let component: DescontoComponent<TestUserRunTime>;
  let fixture: ComponentFixture<DescontoComponent<TestUserRunTime>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescontoComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<DescontoComponent<TestUserRunTime>>(
        DescontoComponent
      );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
