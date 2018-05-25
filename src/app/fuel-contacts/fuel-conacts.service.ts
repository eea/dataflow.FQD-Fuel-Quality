import {Injectable} from '@angular/core';

import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Country} from './country';
import {HttpClient} from '@angular/common/http';
import {BaseControl} from '../dynamic-forms/controls/base-control';
import {AutocompleteControl} from '../dynamic-forms/controls/autocomplete-control';
import {CalendarControl} from '../dynamic-forms/controls/calendar-control';
import {GroupControl} from '../dynamic-forms/controls/group-control';
import {TextBoxControl} from '../dynamic-forms/controls/textbox-control';


@Injectable()
export class FuelContactsService {
    private countries: Country[];
    private filteredCountries = {value: []};

    constructor(private http: HttpClient) {
        this.getCountries()
            .subscribe((data: Country[]) => {
                this.countries = data;
            });
    }

    getControls(): BaseControl[] {

        return [

            new AutocompleteControl({
                key: 'country',
                label: 'Country',
                suggestions: this.filteredCountries,
                searchFn: this.searchCountries,
                suggestionField: 'name',
                validators: [
                    {errorKey: 'required', validator: Validators.required},
                ]

            }),

            new CalendarControl({
                key: 'dateReportCompleted',
                label: 'Date Report Completed',
                dateFormat: 'dd/mm/y',
                showIcon: true
            }),


            new GroupControl({
                key: 'organisationAddress',
                controlsPerRow: 2,
                groupControls: [
                    new TextBoxControl({
                        key: 'organisationResponsibleForReport',
                        label: 'Organisation',
                        validators: [
                            {
                                errorKey: 'required',
                                validator: Validators.required
                            },
                            {
                                errorKey: 'forbiddenName',
                                validator: forbiddenNameValidator(/EEA/i),
                                validationMessage: 'Organisation responsible for report cannot be EEA'
                            }
                        ]
                    }),
                    new TextBoxControl({
                        key: 'address',
                        label: 'Address Of Organisation Street',
                    }),
                    new TextBoxControl({
                        key: 'city',
                        label: 'City',
                    }),
                    new TextBoxControl({
                        key: 'postCode',
                        label: 'Post Code',
                        validators: [
                            {
                                errorKey: 'minlength',
                                validator: Validators.minLength(5),
                                validationMessage: 'Minimum length is 5'
                            }
                        ]
                    }),
                ]
            }),

            new GroupControl({
                key: 'personInfo',
                controlsPerRow: 2,
                groupControls: [
                    new TextBoxControl({
                        key: 'personResponsibleForReport',
                        label: 'Person Responsible for Report',
                    }),
                    new TextBoxControl({
                        key: 'telephoneNumber',
                        label: 'Telephone Number',
                    }),

                    new TextBoxControl({
                        key: 'email',
                        label: 'Email',
                        validators: [
                            {
                                errorKey: 'email',
                                validator: Validators.email
                            }
                        ],
                    })
                ]
            })

        ];
    }

    getCountries(): Observable<Country[]> {
        return this.http.get<Country[]>('./assets/countries.json');
    }

    searchCountries = (event) => {
        return this.countries
            .filter((country: Country) => country.name.toLowerCase().includes(event.query.toLowerCase()));
    }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}

