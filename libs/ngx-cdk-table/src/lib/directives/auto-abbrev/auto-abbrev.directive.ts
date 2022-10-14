import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: 'span[gloveWizardAutoAbbrev] span',
})
export class AutoAbbrevDirective implements AfterViewInit {
  constructor(
    private readonly elementRef: ElementRef<HTMLSpanElement>,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('window:resize') onResize() {
    this.createAbbrev();
  }

  ngAfterViewInit(): void {
    this.createAbbrev();
  }

  createAbbrev() {
    const nativeElementOffsetWidth = this.elementRef.nativeElement.offsetWidth;
    const nativeElementChildren = this.elementRef.nativeElement
      .children[0] as HTMLElement;

    if (!nativeElementChildren?.offsetWidth) return;

    const nativeElementChildrenOffsetWidth = nativeElementChildren.offsetWidth;

    const containerElement = nativeElementChildren.parentElement?.parentElement;
    const containerElementOffsetWidth =
      containerElement?.offsetWidth || nativeElementOffsetWidth;
    const abbr$ = `<abbr title="${nativeElementChildren.innerText}">${nativeElementChildren.innerText}</abbr>`;

    if (
      nativeElementOffsetWidth < nativeElementChildrenOffsetWidth ||
      containerElementOffsetWidth < nativeElementOffsetWidth
    ) {
      this.renderer.setProperty(nativeElementChildren, 'innerHTML', abbr$);
      return;
    }

    if (!nativeElementChildren.children[0]) return;

    const abbr = nativeElementChildren.children[0] as HTMLSpanElement;

    this.renderer.setProperty(
      nativeElementChildren,
      'innerHTML',
      abbr.innerText
    );
  }
}
