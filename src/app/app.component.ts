import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FuelData} from './fuel-data';
import {parse} from 'js2xmlparser';
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {FuelDataService} from './fuel-data.service';
import {DynamicFormService} from './dynamic-forms/dynamic-form/dynamic-form.service';
import {GroupControl} from './dynamic-forms/controls/group-control';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'app';

    fuelData: FuelData;

    parentFormGroup: FormGroup;

    parentGroupControl: GroupControl;

    topValidators: ValidatorFn[];

    fuelDataXml() {
        if (this.fuelData !== undefined) {
            return parse('fuel-data', this.fuelData, {format: {pretty: true}});
        }
    }

    constructor(private dynamicFormService: DynamicFormService, private cd: ChangeDetectorRef, private petrolService: FuelDataService) {

        this.topValidators = [testCrossFormGroupValidator()];

        this.petrolService.getFuelData()
            .subscribe((fuelData: FuelData) => {
                this.fuelData = fuelData;
            });

        this.parentGroupControl = new GroupControl({
            key: 'parentForm',
            showErrors: true,
            showNestedFormGroupErrors: true,
            groupValidators: this.topValidators
        });
        this.parentFormGroup = this.dynamicFormService.toFormGroup(this.parentGroupControl);
    }

    ngOnInit() {

    }

    // TODO check if there is a better way to avoid error ExpressionChangedAfterItHasBeenCheckedError (comment line to see the error)
    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    submit() {
        this.fuelData = this.parentFormGroup.getRawValue();
        alert('Nothing here yet!');
    }

}

// testing cross form group validation
export function testCrossFormGroupValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        // TODO form model is not type-safe so for the moment and since form model === data model we can cast to data model for type safety
        const fuelData = control.value as FuelData;
        if (fuelData.nestedFormValidation && fuelData.contacts) {
            return fuelData.nestedFormValidation.testField1 === fuelData.contacts.organisationResponsibleForReport
                ? null
                : {'crossFormGroupError1': 'Test Error'};
        }
        return null;
    };
}

