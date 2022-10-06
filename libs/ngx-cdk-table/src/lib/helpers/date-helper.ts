import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  NativeDateAdapter,
} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Injectable()
class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'dd-MM-yyyy', this.locale);
    }

    const transformedDate = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const capitalize = (text: string) =>
      text.charAt(0).toUpperCase() + text.slice(1);

    return capitalize(transformedDate);
  }
}
@Injectable()
class BrazilianDateAdapter extends NativeDateAdapter {
  override parse(value: string): Date | null {
    const length = value.length;

    const brazilianDate = value.includes('/') && length;

    if (brazilianDate) {
      const [day, month, year] = value.split('/');
      return new Date(+year, +month - 1, +day);
    }

    if (length === 8) {
      const day = value.substring(0, 2);
      const month = value.substring(2, 4);
      const year = value.substring(4, 8);
      return new Date(+year, +month - 1, +day);
    }

    return null;
  }
}

export const DATE_VERBOSE_BRAZILIAN_PICKER_PROVIDERS = [
  {
    provide: DateAdapter,
    useClass: PickDateAdapter,
  },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
];
export const DD_MM_YYY_BRAZILIAN_PICKER_PROVIDERS = [
  {
    provide: DateAdapter,
    useClass: BrazilianDateAdapter,
  },
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
];
