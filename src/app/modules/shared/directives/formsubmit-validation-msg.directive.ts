import { Directive, Input, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Directive to update form validity on submit button clicked
 */
@Directive({
  selector: '[appFormSubmitValidationMsg]'
})

export class FormSubmitValidationMsgDirective {
  
  @Input() validationControl: FormGroup;
  
  // Attach a listener to click event
  @HostListener('click', ['$event'])
  handleClickEvent(event: Event) {
    this.markAsTouched(this.validationControl);
  }
  
  /**
   * Method to update validity of all fields in the form
   * @param [formGroup] - Form group Reference object
   */
  private markAsTouched(formGroup: FormGroup): void {
    formGroup.markAsTouched();
    formGroup.updateValueAndValidity();
    (Object as any).values(formGroup.controls).forEach(
      (control: any) => {
        control.markAsTouched();
        control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
        if (control.controls) {
          this.markAsTouched(control);
        }
      });
  }
  
}
