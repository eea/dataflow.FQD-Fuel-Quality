import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {Contacts} from './fuel-contacts';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {FuelContactsService} from './fuel-conacts.service';
import {GroupControl} from '../dynamic-forms/controls/group-control';
import {BaseControl} from '../dynamic-forms/controls/base-control';
import {TextBoxControl} from '../dynamic-forms/controls/textbox-control';
import {DynamicFormService} from '../dynamic-forms/dynamic-form/dynamic-form.service';

@Component({
    selector: 'fuel-contacts',
    templateUrl: './fuel-contacts.component.html',
    styleUrls: ['./fuel-contacts.component.css']
})
export class FuelContactsComponent implements OnInit, AfterContentInit {


    @Input()
    contacts: Contacts;

    @Input() parentFormGroup: FormGroup;

    fuelContactsFormGroup: FormGroup;

    controls: BaseControl[];

    unrenderedControls: BaseControl[] = [];

    generalSummary: BaseControl;

    fuelContactsGroupControl: GroupControl;

    constructor(private http: HttpClient,
                private fuelContactsService: FuelContactsService,
                private dynamicFormService: DynamicFormService) {
        this.createUnrenderedControls();
    }


    ngOnInit() {

        this.fuelContactsGroupControl = new GroupControl({
            key: 'contacts',
            groupControls: this.fuelContactsService.getControls(),
            unrenderedControls: this.unrenderedControls,
            showErrors: true,
            showNestedFormGroupErrors: true,
            controlsPerRow: 2

        });

        this.fuelContactsFormGroup = this.dynamicFormService.toFormGroup(this.fuelContactsGroupControl, this.parentFormGroup);

    }

    ngAfterContentInit(): void {
        // this.dynamicForm.addControl('generalSummary', this.fb.control({}));
    }

    onSubmit($event: FormGroup) {
        if ($event.valid) {
            this.contacts = this.prepareSaveFuelContact($event);
        } else {
            alert('Validations!!!');
        }

    }

    prepareSaveFuelContact(form: FormGroup): Contacts {
        return form.value;
    }

    // create an unrendered control, which means this will not be rendered automatically, it must be set in the template
    private createUnrenderedControls() {

        this.generalSummary = new TextBoxControl({
            key: 'generalSummary',
            label: 'General Summary'
        });

        this.unrenderedControls.push(this.generalSummary);
    }
}


