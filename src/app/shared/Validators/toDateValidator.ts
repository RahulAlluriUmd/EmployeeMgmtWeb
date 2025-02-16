import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function toDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const toDate = control.get('toDate');
      const fromDate = control.get('fromDate');
  
      if (toDate && fromDate && toDate.value && fromDate.value) {
        const isValid = new Date(toDate.value) > new Date(fromDate.value);
        return isValid ? null : { toDateInvalid: true };
      }
      return null;
    };
  }