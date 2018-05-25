import {Injectable} from '@angular/core';
import {ReportingResultType} from './reporting-result-type';
import {Column} from '../../fuel-settings';

@Injectable()
export class ReportingResultsService {

    constructor() {
    }

    /**
     * The data model is coming in the form of an object whereas the table expects an array of objects to render the rows.
     * For this we need to transform the object to an array and furthermore to add a row in the table
     * if no value exists in the original value object. So we start with the rows that we need to render,
     * which are the report result types
     */
    mapRows(reportResultTypes: ReportingResultType[], cols: Column[], value: any) {
        const rows = [];
        reportResultTypes
            .map(type => rows.push(this.mapRow(type, cols, value)));
        return rows;
    }

    /**
     * For each type we create a row object containing the value (if available in the data model)
     * or an empty string if not. We also flatten some nested data
     */
    mapRow(type: ReportingResultType, cols: Column[], value: any) {
        // we need the report type field name on selection
        const row = {field: type.field};
        cols.forEach(col => {
            switch (col.field) {
                case 'date': {
                    if (value[type.field] && value[type.field][col.field]) {
                        row[col.field] = value[type.field][col.field].year;
                    }
                    break;
                }
                case 'parameter': {
                    row[col.field] = type.header;
                    break;
                }
                default: {
                    if (value[type.field]) {
                        row[col.field] = value[type.field][col.field];
                    } else {
                        row[col.field] = '';
                    }
                    break;
                }
            }
        });
        return row;
    }

    /**
     * Map back the array of reporting results to an object with keys each reporting result
     * @param {any[]} reportingResults
     * @returns {{}}
     */
    mapRowsToValue(reportingResults: any[]) {
        const value = {};
        reportingResults.forEach(reportingResult => {
            Object.assign(value, {
                [reportingResult.field]: reportingResult
            });
        });
        return value;
    }
}
