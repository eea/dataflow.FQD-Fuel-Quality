import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BaseControl, ControlType} from '../controls/base-control';
import {FormError} from '../validation/form-error';

@Component({
    selector: 'dynamic-form-control',
    templateUrl: './dynamic-form-control.component.html',
    styleUrls: ['./dynamic-form-control.component.css']
})
export class DynamicFormControlComponent implements OnInit {

    @Input() control: BaseControl;

    @Input() formGroup: FormGroup;

    @Input() controlErrors: FormError;

    @Input() labelCssClasses: string[];

    @Input() elementCssClasses: string[];

    @Input() controlsPerRow: number;

    @HostBinding('class') hostClasses: string;

    // only way to use enum in angular template...
    // https://stackoverflow.com/questions/42464367/angular2-use-enum-value-in-html-value-attribute/
    ControlType = ControlType;

    constructor() {
    }

    ngOnInit() {
        this.hostClasses = this.calculateHostClasses();
    }

    isFieldRequired() {
        return this.control.validators
            .find(validator => validator.errorKey === 'required');
    }

    /**
     * Retrieves control errors filtering out 'required' error which is handled separately
     * @returns {ErrorTuple | undefined}
     */
    hasErrors() {
        return this.controlErrors.errors
            .filter(error => error.errorKey !== 'required')
            .find(error => error.errorKey !== '');
    }

    hasError(errorKey: string) {
        return this.controlErrors.errors
            .find(error => error.errorKey === errorKey);
    }

    /**
     * Aggregates all error meesages for this control.
     * @returns {string}
     */
    getErrorMessages() {
        return this.controlErrors.errors
            .map(error => error.errorMessage).join('<br>');
    }

    filter($event) {
        if (this.control['filter']) {
            this.control['filter']($event);
        }
    }

    private calculateHostClasses() {
        let classes = '';
        switch (this.controlsPerRow) {
            case 1: {
                classes = 'ui-g-12 ui-sm-12';
                break;
            }
            case 2: {
                classes = 'ui-g-6 ui-sm-12';
                break;
            }
            case 3: {
                classes = 'ui-g-4 ui-sm-12';
                break;
            }
            case 4: {
                classes = 'ui-g-3 ui-sm-12';
                break;
            }

            case 6: {
                classes = 'ui-g-2 ui-sm-12';
                break;
            }
            default: {
                classes = 'ui-g-12 ui-sm-12';
                break;
            }
        }
        return classes;
    }

}
