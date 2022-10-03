import { InjectionToken, PipeTransform } from '@angular/core';

export const CURRENCY_PIPE = new InjectionToken<PipeTransform>('currency');
export const DATE_PIPE = new InjectionToken<PipeTransform>('date');
