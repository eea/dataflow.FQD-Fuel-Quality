import {Component, Input, OnInit} from '@angular/core';
import {GroupControl} from '../../../dynamic-forms/controls/group-control';

@Component({
    selector: 'reporting-result',
    templateUrl: './reporting-result.component.html',
    styleUrls: ['./reporting-result.component.css']
})
export class ReportingResultComponent implements OnInit {

    @Input() groupControl: GroupControl;

    @Input() group: any;

    @Input() value: any;

    constructor() {

    }

    ngOnInit() {

    }

}
