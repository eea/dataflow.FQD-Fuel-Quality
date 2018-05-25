import {BaseControl, BaseControlOptions, ControlType} from './base-control';
import {ValidatorFn} from '@angular/forms';

export class ArrayControl extends BaseControl {

    controlType = ControlType.ARRAY;

    arrayControls: BaseControl[];
    unrenderedControls: BaseControl[];
    arrayValidators?: ValidatorFn[];

    constructor(options: ArrayControlOptions = {}) {
        super(options);

        this.arrayControls = options.arrayControls;
        this.unrenderedControls = options.unrenderedControls || [];
        this.arrayValidators = options.arrayValidators;
    }

    push(control: BaseControl) {
        this.arrayControls.push(control);
    }

    pushUnrendered(control: BaseControl) {
        this.unrenderedControls.push(control);
    }

    /** Remove the control at the given `index` in the array. */
    removeAt(index: number) {
        this.arrayControls.splice(index, 1);
    }

    removeUnrenderedAt(index: number) {
        this.unrenderedControls.splice(index, 1);
    }
}


export interface ArrayControlOptions extends BaseControlOptions {
    arrayControls?: BaseControl[];
    unrenderedControls?: BaseControl[];
    arrayValidators?: ValidatorFn[];
}
