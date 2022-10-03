import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectInput, TableInputComponent } from '../../../models/table';

@Component({
  selector: 'glove-wizard-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent<T> implements OnInit, TableInputComponent<T> {
  control = new FormControl();
  element: T;
  defaultInputColumns: SelectInput<T>;
  eventAction: EventEmitter<T> = new EventEmitter<T>();
  onTouched: (value: any) => void;
  onChanges: (value: any) => void;
  value: any;

  ngOnInit(): void {
    const optionSelected = this.element[this.defaultInputColumns.key];

    if (optionSelected) {
      this.control.setValue(optionSelected);
      this.writeValue(optionSelected);
    }

    this.control.valueChanges.subscribe((value) => {
      this.element[this.defaultInputColumns.key] = value;
      this.writeValue(value);
    });
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: (value: any) => void): void {
    this.onChanges = fn;
  }
  registerOnTouched(fn: (value: any) => void): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    const method = isDisabled ? 'disable' : 'enable';
    this.control[method]();
  }
}
