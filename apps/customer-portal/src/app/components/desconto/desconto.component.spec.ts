import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescontoComponent } from './desconto.component';

describe('DescontoComponent', () => {
  let component: DescontoComponent;
  let fixture: ComponentFixture<DescontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DescontoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
