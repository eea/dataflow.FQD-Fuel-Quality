import {ValidatorFn} from '@angular/forms';
import {BaseControl, BaseControlOptions, ControlType} from './base-control';

export class GroupControl extends BaseControl {

    controlType = ControlType.GROUP;

    /**
     * The controls of the FormGroup that will be rendered.
     */
    groupControls: BaseControl[];
    /**
     * The controls of the FormGroup that will not be rendered.
     */
    unrenderedControls: BaseControl[];
    /**
     * The group-level validators.
     */
    groupValidators?: ValidatorFn[];
    /**
     * The number of controls that each UI/grid row should contain.
     */
    controlsPerRow?: number;

    /**
     * Whether or not to show in the UI the FormGroup errors on top of the form.
     */
    showErrors?: boolean;
    /**
     * Whether or not to show in the UI the nested FormGroup errors on top of the form.
     */
    showNestedFormGroupErrors?: boolean;

    constructor(options: GroupControlOptions = {}) {
        super(options);

        this.groupControls = options.groupControls || [];
        this.unrenderedControls = options.unrenderedControls || [];
        this.groupValidators = options.groupValidators;
        this.controlsPerRow = options.controlsPerRow === undefined ? 1 : options.controlsPerRow;
        this.showErrors = options.showErrors;
        this.showNestedFormGroupErrors = options.showNestedFormGroupErrors;
    }
}

export interface GroupControlOptions extends BaseControlOptions {
    groupControls?: BaseControl[];
    unrenderedControls?: BaseControl[];
    groupValidators?: ValidatorFn[];
    controlsPerRow?: number;
    showErrors?: boolean;
    showNestedFormGroupErrors?: boolean;
}
