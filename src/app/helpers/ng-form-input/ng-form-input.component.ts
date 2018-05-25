import {Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'ng-form-input',
    templateUrl: './ng-form-input.component.html',
    styleUrls: ['./ng-form-input.component.css']
})
export class NgFormInputComponent implements OnInit {

    @Input()
    elementId: string;

    @Input()
    label: string;

    constructor() {
    }

    ngOnInit() {
    }

}
