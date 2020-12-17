import { Injectable } from '@angular/core';

/**
 * Service to provide field validation error msgs
 */
@Injectable()
export class ValidationMsgService {
  
  private errorMessages: any = {
    'note-required' : 'Note is a required field',
    'picture-required' : 'Picture is a required field',
    'video-required': 'Video is a required field',
    'date-required': 'Date is a required field',
    'video-invalidUrl': 'Video must be a valid url',
    'picture-invalidUrl': 'Picture must be a valid url',
  };
  
  /**
   * Function return error msg value
   * @param [validationId] - Validation id
   */
  public getValidationMsg(validationId: string): string {
    return this.errorMessages[validationId];
  }
  
}
