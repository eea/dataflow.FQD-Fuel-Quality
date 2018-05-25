import {Injectable} from '@angular/core';


import {ArrayControl} from '../dynamic-forms/controls/array-control';
import {TextBoxControl} from '../dynamic-forms/controls/textbox-control';
import {GroupControl} from '../dynamic-forms/controls/group-control';
import {BaseControl} from '../dynamic-forms/controls/base-control';
import {Validators} from '@angular/forms';

import {AutocompleteControl} from '../dynamic-forms/controls/autocomplete-control';
import {NumberControl} from '../dynamic-forms/controls/number-control';
import {PetrolFormValidators} from './petrol-form-validators';
import {ConfigService} from '../config.service';
import {ReportingResultType} from './reporting-results/reporting-result-type';

@Injectable()
export class FuelPetrolService {
    petrolFormValidator: PetrolFormValidators;

    years: any[];
    private filteredYears = {value: []};

    constructor(private configService: ConfigService) {
        this.years = [{'year': '2005'},
            {'year': '2006'},
            {'year': '2007'},
            {'year': '2008'},
            {'year': '2009'}];

        this.petrolFormValidator = new PetrolFormValidators(configService);
    }


    getGroupControl(): GroupControl {
        return new GroupControl({
            key: 'petrol',
            groupControls: [
                new TextBoxControl({
                    key: 'country',
                    label: 'Country',
                    validators: [
                        {
                            errorKey: 'required',
                            validator: Validators.required,
                            validationMessage: 'Petrol Country required'
                        }
                    ],
                    disabled: () => true
                }),
                new TextBoxControl({
                    key: 'reportingYear',
                    label: 'Reporting Year',
                    disabled: () => true
                }),
                new TextBoxControl({
                    key: 'nationalFuelGrade',
                    label: 'National Fuel Grade',
                }),
            ],
            unrenderedControls: [
                new ArrayControl({
                    key: 'petrols',
                    arrayControls: []
                })
            ],
            controlsPerRow: 3
        });
    }

    createPetrolGroupControl(reportResultTypes): GroupControl {
        return new GroupControl({
            key: 'petrol',
            groupValidators: [
                this.petrolFormValidator.numOfSampleFrequencyValidation(),
                // this.petrolFormValidator.uniqueCountry()
            ],
            groupControls: [

                new GroupControl({
                    key: 'basicPetrolInfo',
                    groupValidators: [
                        this.petrolFormValidator.periodValidation()
                    ],
                    groupControls: [

                        new TextBoxControl({
                            key: 'period',
                            label: 'Period',
                            labelCssClasses: ['ui-g-4 ui-sm-6'],
                            disabled: () => true
                        }),
                        new TextBoxControl({
                            key: 'parentFuelGrade',
                            label: 'Parent Fuel Grade',
                            labelCssClasses: ['ui-g-4 ui-sm-6'],
                            disabled: () => true
                        }),
                        new TextBoxControl({
                            key: 'summerPeriodNorA',
                            label: 'Summer Period',
                            labelCssClasses: ['ui-g-4 ui-sm-6']
                        }),
                        new TextBoxControl({
                            key: 'maximumBioethanolContent',
                            label: 'Max Bioethanol Content',
                            labelCssClasses: ['ui-g-4 ui-sm-6']
                        })
                    ],
                    showErrors: true,
                    controlsPerRow: 3
                }),
            ]
                .concat(this.getReportingResultGroups(reportResultTypes))
                .concat(new GroupControl({
                    key: 'sampleFrequency',
                    groupControls: this.getSampleFrequencyControls(),
                    controlsPerRow: 3
                }))
        });
    }

    getReportingResultGroups(reportResultTypes: ReportingResultType[]): GroupControl[] {
        const reportingResultGroupControls: GroupControl[] = [];
        reportResultTypes
            .map(type => type.field)
            .forEach(key => reportingResultGroupControls.push(new GroupControl({
                key: key,
                groupControls: this.getReportResultGroup(),
                groupValidators: [this.petrolFormValidator.minMaxValidation()],
                showErrors: true,
                controlsPerRow: 3
            })));
        return reportingResultGroupControls;
    }

    getReportResultGroup(): BaseControl[] {
        return [
            new TextBoxControl({
                key: 'unit', label: 'Unit', disabled: () => true
            }),
            new TextBoxControl({
                key: 'numOfSamples', label: 'Number Of Samples',
                validators: [
                    {
                        errorKey: 'required',
                        validator: Validators.required,
                        validationMessage: 'num of samples'
                    }]
            }),
            new TextBoxControl({key: 'min', label: 'Min'}),
            new TextBoxControl({key: 'max', label: 'Max'}),
            new TextBoxControl({key: 'median', label: 'Median'}),
            new TextBoxControl({key: 'mean', label: 'Mean'}),
            new TextBoxControl({key: 'standardDeviation', label: 'Standard Deviation'}),
            new TextBoxControl({key: 'toleranceLimit', label: 'Tolerance Limit'}),
            new TextBoxControl({key: 'sampleValue25', label: '25% of Sample Value'}),
            new TextBoxControl({key: 'sampleValue75', label: '75% of Sample Value'}),
            new TextBoxControl({key: 'nationalMin', label: 'National Min'}),
            new TextBoxControl({key: 'nationalMax', label: 'National Max'}),
            new TextBoxControl({key: 'directiveMin', label: 'Directive Min', disabled: () => true}),
            new TextBoxControl({key: 'directiveMax', label: 'Directive Max', disabled: () => true}),
            new TextBoxControl({key: 'method', label: 'Method', disabled: () => true}),
            new AutocompleteControl({
                key: 'date', label: 'Date',
                suggestions: this.filteredYears,
                searchFn: this.searchYears,
                suggestionField: 'year',
                disabled: () => true
            })
        ];
    }

    getSampleFrequencyControls(): BaseControl[] {
        return [
            new NumberControl({key: 'Jan', label: 'January'}),
            new NumberControl({key: 'Feb', label: 'February'}),
            new NumberControl({key: 'Mar', label: 'March'}),
            new NumberControl({key: 'Apr', label: 'April'}),
            new NumberControl({key: 'May', label: 'May'}),
            new NumberControl({key: 'Jun', label: 'June'}),
            new NumberControl({key: 'Jul', label: 'July'}),
            new NumberControl({key: 'Aug', label: 'August'}),
            new NumberControl({key: 'Sep', label: 'September'}),
            new NumberControl({key: 'Oct', label: 'October'}),
            new NumberControl({key: 'Nov', label: 'November'}),
            new NumberControl({key: 'Dec', label: 'December'}),
            new TextBoxControl({key: 'totalMonthValue', label: 'Total Month Samples', disabled: () => true})
        ];
    }


    searchYears = (event) => {
        return this.years
            .filter((y: any) => y.year.includes(event.query));
    }
}
