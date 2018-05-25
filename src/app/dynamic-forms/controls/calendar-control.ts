import {BaseControl, BaseControlOptions, ControlType} from './base-control';

export class CalendarControl extends BaseControl {
    controlType = ControlType.CALENDAR;

    dateFormat: string;
    showIcon: boolean;

    constructor(options: CalendarControlOptions = {}) {
        super(options);
        this.dateFormat = options.dateFormat;
        this.showIcon = options['showIcon'];
    }
}

export interface CalendarControlOptions extends BaseControlOptions {
    showIcon?: boolean;
    dateFormat?: string;
}
