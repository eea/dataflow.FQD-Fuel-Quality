import {BaseControl, BaseControlOptions, ControlType} from './base-control';

export class TextBoxControl extends BaseControl {

    controlType = ControlType.TEXT;

    constructor(options: BaseControlOptions = {}) {
        super(options);
    }
}

