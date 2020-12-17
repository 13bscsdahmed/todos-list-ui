// Angular Imports
import { FormControl } from '@angular/forms';


/**
 * Validator utility to help in form validations
 */
export class ValidatorUtil {
  
  /**
   * Function to validate url
   * @param [control] - Control
   *
   */
  public static urlValidator(control: FormControl) {
    
    const urlRegexp = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    
    if (control.value && !urlRegexp.test(control.value)) {
      return { invalidUrl: true };
    } else {
      return null;
    }
  }
}
