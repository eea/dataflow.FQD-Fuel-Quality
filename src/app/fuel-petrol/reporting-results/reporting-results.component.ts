import {Component, Input, OnInit} from '@angular/core';
import {BaseControl} from '../../dynamic-forms/controls/base-control';
import {GroupControl} from '../../dynamic-forms/controls/group-control';
import {FormGroup, ValidatorFn} from '@angular/forms';

import {ReportingResultType} from './reporting-result-type';
import {Column} from '../../fuel-settings';
import {PetrolFormValidators} from '../petrol-form-validators';
import {ConfigService} from '../../config.service';
import * as Handsontable from 'handsontable';
import {ReportingResultsService} from './reporting-results.service';

@Component({
    selector: 'reporting-results',
    templateUrl: './reporting-results.component.html',
    styleUrls: ['./reporting-results.component.css']
})
export class ReportingResultsComponent implements OnInit {

    @Input() reportResultTypes: ReportingResultType[];

    @Input() controls: BaseControl[];

    @Input() group: FormGroup;

    @Input() value: any;

    @Input() cols: Column[];

    rows: any[];

    years: any[];

    petrolFormValidator: PetrolFormValidators;

    groupValidators: ValidatorFn[] = [];

    displayDialog: boolean;

    selectedReportingResult: string;

    selectedReportingResultHeader: string;

    hotTableSettings: Handsontable.GridSettings;

    renderHot: boolean;

    constructor(private configService: ConfigService, private reportingResultsService: ReportingResultsService) {

    }

    ngOnInit() {
        this.petrolFormValidator = new PetrolFormValidators(this.configService);

        this.rows = this.reportingResultsService.mapRows(this.reportResultTypes, this.cols, this.value);

        this.hotTableSettings = {
            colHeaders: this.cols.map(col => col.header),
            startCols: this.cols.length,
            data: this.rows,
            columns: this.cols.map(col => {
                    return {
                        data: col.field,
                        readOnly: col.readOnly
                    };
                }
            ),
            preventOverflow: 'horizontal'
        };

    }

    filteredGroupControl(key) {
        return (this.controls.filter(control => control.key === key)[0] as GroupControl);
    }

    openReportingResultDialog($event) {
        this.displayDialog = true;
        this.selectedReportingResult = $event.data.field;
        this.selectedReportingResultHeader = $event.data.parameter;
    }

    save() {
        if (this.group.get(this.selectedReportingResult).valid) {
            this.displayDialog = false;
            this.value = this.group.getRawValue();
            const selectedRowIndex = this.rows.findIndex(row => row.field === this.selectedReportingResult);
            this.replaceRow(selectedRowIndex);
            // TODO refresh calculated fields
        }
    }

    close() {
        this.displayDialog = false;
        // reset FormGroup value to initial
        this.group.get(this.selectedReportingResult).patchValue(this.value[this.selectedReportingResult]);
    }


    toggleEditAllRows() {
        this.renderHot = !this.renderHot;
        if (!this.renderHot) {
            // assigning to value does not automatically update the FormGroup...
            const newValue = this.reportingResultsService.mapRowsToValue(this.rows);
            this.value = newValue;
            // ...patchValue must be also called to immediately update the FormGroup
            this.group.patchValue(newValue);
        }
    }

    /**
     * For every changed row, manually marks dirty all fields of corresponding FormGroup.
     * @param $event
     */
    markGroupControlsDirty($event) {
        const changedFormGroups = $event
            .map(rowIndex => this.rows[rowIndex].field)
            .map(field => this.group.get(field) as FormGroup);

        changedFormGroups.forEach(group => {
            Object.keys(group.controls)
                .forEach(key => group.get(key).markAsDirty());
        });
    }


    /**
     * Replace row with new data form the form
     * @param {number} selectedRowIndex
     */
    private replaceRow(selectedRowIndex: number) {
        const selectedType = this.reportResultTypes.find(type => type.field === this.selectedReportingResult);
        this.rows.splice(selectedRowIndex, 1,
            this.reportingResultsService.mapRow(selectedType, this.cols, this.value));
    }

    getInvalidRowStyleClass(rowData: any) {
        return this.group.controls[rowData.field].invalid &&
        this.group.controls[rowData.field].dirty ? 'invalid-row' : null;
    }
}

