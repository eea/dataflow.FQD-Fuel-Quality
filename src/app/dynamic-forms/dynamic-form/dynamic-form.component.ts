import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GroupControl} from '../controls/group-control';
import {BaseControl, ControlType} from '../controls/base-control';
import {GroupingService} from '../grouping.service';
import {debounceTime} from 'rxjs/operators/debounceTime';
import {FormError, ValidationErrorMessage} from '../validation/form-error';
import {ValidationService} from '../validation/validation.service';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

    // only way to use enum in angular template...
    // https://stackoverflow.com/questions/42464367/angular2-use-enum-value-in-html-value-attribute/
    ControlType = ControlType;

    /**
     * The GroupControl containing the controls that are used to create the FormGroup.
     */
    @Input() groupControl: GroupControl;

    /**
     * The FormGroup created by the DynamicFormService using the GroupControl above.
     */
    @Input() formGroup: FormGroup;

    /**
     * The value object for the specific FormGroup
     */
    @Input() value: any;

    /**
     * The original controls grouped by row (according to the controlsByRow property of the GroupControl
     */
    groupedControls: BaseControl[][];

    /**
     * The errors (if any) for the specific FormGroup.
     * @type {any[]}
     */
    formErrors: FormError[] = [];

    /**
     * All the validation messages for each possible error for the specific FormGroup.
     * @type {any[]}
     */
    validationMessages: ValidationErrorMessage[] = [];

    constructor(private groupingService: GroupingService, private validationService: ValidationService) {
    }

    ngOnInit() {
        if (!this.formGroup || !this.groupControl) {
            return;
        }

        this.groupedControls = this.groupingService.groupControls(this.groupControl);

        this.initValidation();
        this.formGroup.valueChanges
            .pipe(debounceTime(300))
            .subscribe(data => this.onValueChanged(data));

        if (this.value) {
            this.bindDataToForm(this.value);
        }

        this.onValueChanged(); // (re)set validation errors
    }

    getControlErrors(key: string) {
        return this.formErrors.find(error => error.controlKey === key);
    }

    private initValidation() {
        this.groupControl.groupControls
            .forEach((control) => {
                this.formErrors.push({
                    controlKey: control.key,
                    errors: this.validationService.generateFormErrorStructure(control)
                });
                this.validationMessages.push({
                    controlKey: control.key,
                    validationTuple: this.validationService.generateValidationMessages(control)
                });
            });
    }

    private onValueChanged(data?: any) {
        if (!this.formGroup) {
            return;
        }
        this.formErrors = this.validationService.updateFormErrors(this.formGroup, this.formErrors, this.validationMessages);
        // TODO possibly re-introduce relation service
        // this.disabledControls = this.relationService.handleRelations(this.form, this.controls, this.disabledControls);
    }

    private bindDataToForm(value: any) {
        this.formGroup.patchValue(value);
    }

}
