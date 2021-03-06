import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  @Output() updateNumberMask = new EventEmitter();

  constructor(public ngControl: NgControl) { }

  @HostListener('keyup', ['$event'])
  onModelChange(event) {
    this.onInputChange(event.target.value, true);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    let newVal = event.replace(/\D/g, '');
  
    /*
      if (backspace && newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);
      }
    */

    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 2) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1');
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,1})/, '($1) $2');
    } else if (newVal.length <= 7) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,1})(\d{0,4})/, '($1) $2 $3');
    } else {
      newVal = newVal.substring(0, 11);
      newVal = newVal.replace(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/, '($1) $2 $3-$4');
      console.log(newVal)
    }

    this.ngControl.valueAccessor.writeValue(newVal);
    this.updateNumberMask.emit(newVal);
  }
}
