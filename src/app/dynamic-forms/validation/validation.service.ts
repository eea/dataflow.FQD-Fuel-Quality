import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {ErrorTuple, FormError, ValidationErrorMessage} from './form-error';
import {BaseControl} from '../controls/base-control';

export const defaultValidationMessages = {
    'required': 'This field is required',
    'minlength': 'Minimum length is ${minLength}',
    'email': 'The email is not valid'
};

@Injectable()
export class ValidationService {

    constructor() {
    }

    /**
     * Generates object of the form:
     *
     *  {
     *      errorKey1: '',
     *      errorKey2: ''
     *  }
     *
     * This is the object were the error messages will be stored, per control and per error type (key) when validation is performed
     */
    generateFormErrorStructure(control: BaseControl): ErrorTuple[] {
        return control.validators.map(validator => {
            return {
                errorKey: validator.errorKey,
                errorMessage: ''
            };
        });
        // return control.validators
        //     .map(validator => validator.formError)
        //     .reduce((o, key) => ({...o, [key]: ''}), {});
    }

    /**
     * Generates object of the form:
     *
     * {
     *      errorKey1: validationMessage1,
     *      errorKey2: validationMessage2
     * }
     *
     * This object is used to select which validation messages will be shown for a specific control
     */
    generateValidationMessages(control: BaseControl): ErrorTuple[] {
        return control.validators.map(validator => {
            return {
                errorKey: validator.errorKey,
                errorMessage: this.getValidationMessages(validator)
            };
        });
        // return control.validators
        //     .reduce((o, key) => ({...o, [key.formError]: this.getValidationMessages(key)}), {});
    }

    /**
     * TODO this method maybe incomplete
     *
     * @param {FormGroup} form
     * @param {any[]} formErrors
     * @param validationMessages
     * @returns {any[]}
     */
    updateFormErrors(form: FormGroup, formErrors: FormError[], validationMessages: ValidationErrorMessage[]): FormError[] {
        formErrors.map(formError => formError.controlKey)
            .map(field => {
                const fieldFormErrors = this.clearPreviousErrors(formErrors, field);
                const fieldMessages = validationMessages.find(v => v.controlKey === field).validationTuple;
                const control = form.get(field);

                if (this.isControlInvalid(control)) {
                    Object.keys(control.errors).map(errorName => {
                        fieldFormErrors.errors.push(fieldMessages.find(m => m.errorKey === errorName));
                    });
                }
            });
        return formErrors;
    }

    // if a validation message is not passed in the control, a default one is selected
    private getValidationMessages(key): string {
        return !!key.validationMessage ? key.validationMessage : defaultValidationMessages[key.errorKey];
    }

    private clearPreviousErrors(formErrors: FormError[], field) {
        const fieldFormErrors = formErrors.find(error => error.controlKey === field);
        fieldFormErrors.errors = [];
        return fieldFormErrors;
    }

    private isControlInvalid(control: AbstractControl) {
        return control &&
            !(control instanceof FormGroup) &&
            !(control instanceof FormArray) &&
            control.dirty &&
            !control.valid &&
            control.enabled;
    }
}
