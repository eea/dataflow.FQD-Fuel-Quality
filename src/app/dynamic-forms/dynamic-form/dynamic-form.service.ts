import {Injectable} from '@angular/core';
import {GroupControl} from '../controls/group-control';
import {BaseControl, ControlType} from '../controls/base-control';
import {FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ValidatorConfig} from '../validation/validator-config';
import {ArrayControl} from '../controls/array-control';

@Injectable()
export class DynamicFormService {

    constructor() {
    }

    /**
     * Creates an Angular reactive FormGroup given the dynamic GroupControl.
     *
     * Uses both groupControls and unrenderedControls to create the FormGroup controls.
     * Handles FormControls, nested FormGroups and FormArrays.
     * Also adds the created FormGroup to its parent (if provided).
     *
     * @param {GroupControl} groupControl
     * @param {FormGroup | FormArray} parent
     * @returns {FormGroup}
     */
    toFormGroup(groupControl: GroupControl, parent?: FormGroup | FormArray): FormGroup {
        const newGroup: any = {};

        groupControl.groupControls
            .concat(groupControl.unrenderedControls)
            .forEach(control => {
                newGroup[control.key] = this.createControl(control);
            });

        const newFormGroup = new FormGroup(newGroup, groupControl.groupValidators);

        if (parent) {
            this.addToParent(parent, newFormGroup, groupControl.key);
        }

        return newFormGroup;
    }

    /**
     * Creates an Angular reactive FormArray given the dynamic ArrayControl.
     *
     * Uses both groupControls and unrenderedControls to create the FormGroup controls.
     * Handles FormControls, nested FormGroups and FormArrays.
     *
     * @param {ArrayControl} arrayControl
     * @returns {FormArray}
     */
    toFormArray(arrayControl: ArrayControl) {
        const formArray = new FormArray([], arrayControl.arrayValidators);

        arrayControl.arrayControls
            .concat(arrayControl.unrenderedControls)
            .forEach(control => {

                if (control.controlType === ControlType.GROUP) {
                    formArray.push(this.toFormGroup(control as GroupControl));
                } else if (control.controlType === ControlType.ARRAY) {
                    formArray.push(this.toFormArray(control as ArrayControl));
                } else {
                    formArray.push(this.createFormControl(control));
                }

            });

        return formArray;
    }

    private createControl(control: BaseControl) {
        switch (control.controlType) {
            case ControlType.GROUP:
                return this.toFormGroup(control as GroupControl);
            case ControlType.ARRAY:
                return this.toFormArray(control as ArrayControl);
            default:
                return this.createFormControl(control);
        }
    }

    private createFormControl(control: BaseControl) {
        return new FormControl({
                value: control.value,
                disabled: control.disabled()
            },
            this.getValidators(control.validators)
        );
    }

    private getValidators(validators: ValidatorConfig[]): ValidatorFn[] {
        if (!validators) {
            return null;
        }
        return validators.map((validator) => validator.validator);
    }

    private addToParent(parent: FormGroup | FormArray, formGroup: FormGroup, name?: string) {
        if (parent instanceof FormGroup) {
            parent.addControl(name, formGroup);
        } else if (parent instanceof FormArray) {
            parent.push(formGroup);
        }
    }


}
