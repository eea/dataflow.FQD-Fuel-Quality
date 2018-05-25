import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GroupControl} from '../../dynamic-forms/controls/group-control';

@Component({
    selector: 'fuel-petrol-tab',
    templateUrl: './fuel-petrol-tab.component.html',
    styleUrls: ['./fuel-petrol-tab.component.css']
})
export class FuelPetrolTabComponent implements OnInit {

    @Input() petrolGroupControl: GroupControl;
    @Input() petrolFormGroup: FormGroup;
    @Input() value;
    @Input() reportResultTypes;
    @Input() columns;

    constructor() {
    }

    ngOnInit() {
    }

    getBasicPetrolInfoControls() {
        return this.petrolGroupControl.groupControls
            .find(control => control.key === 'basicPetrolInfo');
    }

    getBasicPetrolInfoFormGroup(): FormGroup {
        return this.petrolFormGroup.get('basicPetrolInfo') as FormGroup;
    }

    getBasicPetrolInfoValue() {
        return this.value['basicPetrolInfo'];
    }

    getReportingResultsControls() {
        return this.petrolGroupControl.groupControls;
    }

    getSamplingFrequencyGroupControl() {
        return this.petrolGroupControl.groupControls
            .find(control => control.key === 'sampleFrequency') as GroupControl;

    }
}
