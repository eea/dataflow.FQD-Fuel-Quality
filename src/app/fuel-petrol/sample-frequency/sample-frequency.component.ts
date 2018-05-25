import {Component, Input, OnInit} from '@angular/core';
import {GroupControl} from '../../dynamic-forms/controls/group-control';

@Component({
    selector: 'sample-frequency',
    templateUrl: './sample-frequency.component.html',
    styleUrls: ['./sample-frequency.component.css']
})
export class SampleFrequencyComponent implements OnInit {

    @Input() groupControl: GroupControl;

    @Input() group: any;

    @Input() value: any;

    monthsArray: string[];

    constructor() {
        this.monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }

    ngOnInit() {
        this.monthsArray.forEach(m => {
            if (this.group.controls[m]) {
                this.group.controls[m].valueChanges
                    .subscribe(data => this.onChanges(m, data));
            }
        });
    }


    onChanges(month: string, monthValue: any) {
        let totalMonthValue = 0;
        this.monthsArray.filter(m => m !== month).forEach(m => {
            totalMonthValue += this.getNumber(this.group.controls[m].value);
        });
        totalMonthValue += this.getNumber(monthValue);
        this.group.controls['totalMonthValue'].setValue(totalMonthValue);
    }


    getNumber(monthValue: any) {
        return isNaN(parseInt(monthValue, 10)) ? 0 : parseInt(monthValue, 10);
    }
}


