import { Directive, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { ValidationMsgService } from '../services/validation-msg.service';
import { takeUntil } from 'rxjs/operators';


/**
 * Directive to update field validations
 */
@Directive({
  selector: '[appFormControlValidationMsg]'
})

export class FormControlValidationMsgDirective implements OnInit, OnDestroy {
  
  constructor(private elRef: ElementRef,
              private control: NgControl,
              private validationMsgService: ValidationMsgService) { }
              
  // Form control name is passed as input to directive
  @Input('validationMsgId') validationMsgId: string;
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorSpanId = '';

  
  ngOnInit(): void {
    this.errorSpanId = this.validationMsgId + '-error-msg';
    // @ts-ignore
    this.control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(
      (status) => {
        if (status === 'INVALID' && !this.control.pristine) {
          this.showError();
        } else {
          this.removeError();
        }
      }
    );
  }
  
  /**
   * Function to add the error field on the host element
   */
  private showError() {
    this.removeError();

    const valErrors: ValidationErrors = this.control.errors || {};
    const firstKey = Object.keys(valErrors)[0];
    const errorMsgKey = this.validationMsgId + '-' + firstKey;
    
    // Get the error msg from the service
    const errorMsg = this.validationMsgService.getValidationMsg(errorMsgKey);
    
    // Add the error element to field
    const errSpan = '<span style="color:red;" id="' + this.errorSpanId + '">' + errorMsg + '</span>';
    
    // Insert the error element on field
    this.elRef.nativeElement.parentElement.insertAdjacentHTML('beforeend', errSpan);
  }
  
  /**
   * Removes the error from the field
   */
  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) {
      errorElement.remove();
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}

