import {BaseControl, BaseControlOptions, ControlType} from './base-control';


export class AutocompleteControl extends BaseControl {

    controlType = ControlType.AUTOCOMPLETE;

    /**
     * The array of suggestion objects to display.
     */
    suggestions: { value: any[] };
    /**
     * The function to be called to search/filter the data.
     */
    searchFn: Function;
    /**
     * The field of the suggested object to display.
     */
    suggestionField: string;

    constructor(options: AutocompleteControlOptions = {}) {
        super(options);
        this.suggestions = options.suggestions;
        this.searchFn = options.searchFn;
        this.suggestionField = options.suggestionField;
    }

    filter($event) {
        this.suggestions = this.searchFn($event);
    }
}


export interface AutocompleteControlOptions extends BaseControlOptions {
    suggestions?: { value: any[] };
    searchFn?: Function;
    suggestionField?: string;
}
