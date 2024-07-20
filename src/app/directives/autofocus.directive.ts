import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  @Input('appAutofocus') shouldFocus: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.shouldFocus) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      });
    }
  }
}
