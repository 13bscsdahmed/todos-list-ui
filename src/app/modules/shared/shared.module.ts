import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormControlValidationMsgDirective } from './directives/formcontrol-validation-msg.directive';
import { FormSubmitValidationMsgDirective } from './directives/formsubmit-validation-msg.directive';

import { ValidationMsgService } from './services/validation-msg.service';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material.module';

/**
 * Module contains all the shared dependencies
 */
@NgModule({
  declarations: [
    FormControlValidationMsgDirective,
    FormSubmitValidationMsgDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormControlValidationMsgDirective,
    FormSubmitValidationMsgDirective,
    MDBBootstrapModule,
    MaterialModule
    
  ],
  providers: [
    ValidationMsgService
  ]
})
export class SharedModule { }
