import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {ConfigService} from '../config.service';

export class PetrolFormValidators {

    private reportResultTypes: any[];

    constructor(private configService: ConfigService) {
        this.getReportResultTypes();
    }

    private getReportResultTypes(): void {
        if (this.configService != null) {
            this.configService.getPetrolSettings()
                .subscribe((data: any[]) => {
                    this.reportResultTypes = data['reportResultTypes'];
                });
        }

    }

    uniqueCountry() {
        return (control: AbstractControl): {} => {
            const currentBasicPetrolInfoFormGroup = control.get('basicPetrolInfo');
            const errors = {};

            if (control.parent) {
                const parentFromArray = control.parent as FormArray;

                parentFromArray.controls
                    .filter(c => c !== control)
                    .forEach(c => {
                        const basicPetrolInfoFormGroup = c.get('basicPetrolInfo');
                        if (basicPetrolInfoFormGroup.get('country').value.toLowerCase() ===
                            currentBasicPetrolInfoFormGroup.get('country').value.toLowerCase()) {
                            Object.assign(errors, {
                                'Field \'Country\'': 'Country should be unique.'
                            });
                        }
                    });
            }


            return errors ? errors : null;
        };
    }

    periodValidation() {
        return (control: AbstractControl): { [key: string]: any } => {
            const period = control.get('period');
            const summerPeriodNorA = control.get('summerPeriodNorA');

            if (period.value === 'Summer' && summerPeriodNorA.value === 'A') {
                return {'\'Period\' Field': 'Period should be Winter or Summer period should be N'};
            } else if (period.value === 'Winter' && summerPeriodNorA.value === 'N') {
                return {'\'Period\' Field': 'Period should be Summer or Winter period should be A'};
            }

            return null;
        };
    }

    minMaxValidation() {
        return (control: AbstractControl): { [key: string]: any } => {
            const minValue = control.get('min');
            const maxValue = control.get('max');

            // tslint:disable-next-line:radix
            return parseInt(minValue.value) > parseInt(maxValue.value) ? {'\'Min\' Field': 'Min cannot be greater than max'} : null;
        };
    }

    numOfSampleFrequencyValidation() {
        return (control: AbstractControl): {} => {
            const errors = {};

            if (control.get('sampleFrequency')) {
                const fieldTotal = (control.get('sampleFrequency') as FormGroup).controls['totalMonthValue'];


                if (this.reportResultTypes !== undefined && fieldTotal != null) {
                    this.reportResultTypes.forEach(r => {

                        let invalidNumber: boolean;
                        const fieldNumOfSamples = control.get(r.field).get('numOfSamples');
                        invalidNumber = (fieldTotal.value !== undefined) && (fieldNumOfSamples.value !== undefined) &&
                            (fieldTotal.value !== null) && (fieldNumOfSamples.value !== null) &&
                            fieldTotal.value !== 0 &&
                            // tslint:disable-next-line:radix
                            (parseInt(fieldNumOfSamples.value) > parseInt(fieldTotal.value));

                        if (invalidNumber) {
                            Object.assign(errors, {
                                [r.header]: 'Field \'Number of samples\' should be less than.... '
                            });
                        }
                    });
                }
            }


            return errors ? errors : null;
        };
    }
}
