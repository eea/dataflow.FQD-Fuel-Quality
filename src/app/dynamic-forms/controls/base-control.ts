import {ValidatorConfig} from '../validation/validator-config';


const DEFAULT_LABEL_CSS_CLASSES = ['ui-g-3', 'ui-sm-6'];

const DEFAULT_CONTROL_CSS_CLASSES = ['ui-g-6', 'ui-sm-6'];

export enum ControlType {
    TEXT,
    NUMBER,
    CALENDAR,
    AUTOCOMPLETE,
    GROUP,
    ARRAY
    // ...
}

export class BaseControl {
    controlType: ControlType;
    key: string;
    value: any;
    label: string;

    validators: ValidatorConfig[];
    labelCssClasses: string[];
    controlCssClasses: string[];
    disabled: () => boolean;

    constructor(options: BaseControlOptions = {}) {
        if (!options.key) {
            throw Error('[key] is a mandatory field for a control');
        }
        if (options.validators && (this.controlType === ControlType.GROUP || this.controlType === ControlType.ARRAY)) {
            throw Error('[validators] not allowed here! Please provide [groupValidators] or [arrayValidators]');
        }
        this.value = options.value;
        this.key = options.key;
        this.label = options.label || '';

        this.validators = options.validators || [];
        this.labelCssClasses = options.labelCssClasses || DEFAULT_LABEL_CSS_CLASSES;
        this.controlCssClasses = options.controlCssClasses || DEFAULT_CONTROL_CSS_CLASSES;
        this.disabled = options.disabled || (() => false);
    }
}

export interface BaseControlOptions {
    value?: any;
    key?: string;
    label?: string;

    validators?: ValidatorConfig[];
    controlCssClasses?: string[];
    labelCssClasses?: string[];
    disabled?: () => boolean;
}
