import { CurrencyPipe, DatePipe } from '@angular/common';
import { CURRENCY_PIPE, DATE_PIPE } from '../../tokens/generic-pipe.token';

export type AvailablePipes = 'currency' | 'date';

export interface GenericPipe {
  name: AvailablePipes;
  args?: string[] | string;
}

export const DEFAULT_PIPES_PROVIDERS = [
  { provide: CURRENCY_PIPE, useClass: CurrencyPipe },
  { provide: DATE_PIPE, useClass: DatePipe },
];
