import { Directive, ElementRef, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[formatTypedDate]',
})
export class FormatTypedDateDirective implements OnInit {
  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit(): void {
    const element = this.elementRef.nativeElement as HTMLInputElement;

    fromEvent(element, 'keyup').subscribe((event) => {
      const convertEventType = event as KeyboardEvent;
      const maxChar = 10;
      const { value } = element;

      const indexTwoAndNotBackSpace =
        value.length === 2 && convertEventType.key !== 'Backspace';

      const indexFiveAndNotBackSpace =
        value.length === 5 && convertEventType.key !== 'Backspace';

      if (indexTwoAndNotBackSpace || indexFiveAndNotBackSpace) {
        element.value = `${value}/`;
        return;
      }

      if (value.length > maxChar) {
        const hasBar = value[5] === '/';

        if (!hasBar) {
          element.value =
            value.slice(0, 5) + '/' + value.slice(5).substring(0, 4);
          return;
        }

        element.value = value.slice(0, maxChar);
      }

      const valueCanFormatted =
        (value.length >= 10 && !value.includes('/')) ||
        (value.length === 8 && !value.includes('/'));

      if (valueCanFormatted) {
        const day = value.slice(0, 2);
        const month = value.slice(2, 4);
        const year = value.slice(4, 10).substring(0, 4);

        element.value = `${day}/${month}/${year}`;
      }
    });
  }
}
