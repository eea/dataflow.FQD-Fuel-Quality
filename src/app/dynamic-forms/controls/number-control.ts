import {BaseControl, BaseControlOptions, ControlType} from './base-control';
import {Validators} from '@angular/forms';

/**
 * Creates an input with default number validator.
 * A pattern validator is used because the default number input field allows non-numeric characters
 * (like 'e')
 */
export class NumberControl extends BaseControl {

    controlType = ControlType.NUMBER;

    constructor(options: BaseControlOptions = {}) {
        super(options);
        this.validators.push({
            errorKey: 'pattern',
            validator: Validators.pattern(/^(0|[1-9][0-9]*)$/i),
            validationMessage: 'Only numbers allowed!'
        });

    }
}


