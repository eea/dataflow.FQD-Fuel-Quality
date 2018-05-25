import {inject, TestBed} from '@angular/core/testing';

import {DynamicFormService} from './dynamic-form.service';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {GroupControl} from '../controls/group-control';
import {TextBoxControl} from '../controls/textbox-control';
import {ArrayControl} from '../controls/array-control';

let service: DynamicFormService;

describe('DynamicFormService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DynamicFormService]
        });
        service = TestBed.get(DynamicFormService);
    });

    it('should be created', inject([DynamicFormService], () => {
        expect(service).toBeTruthy();
    }));

    it('should create form group with one text box inside parent form', () => {
        const parentFormGroup = new FormGroup({});

        service.toFormGroup(
            new GroupControl({
                key: 'testGroup',
                groupControls: [
                    new TextBoxControl({
                        key: 'testTextBox',
                        label: 'testLabel'
                    })
                ]
            }),
            parentFormGroup
        );

        const testGroup = parentFormGroup.get('testGroup') as FormGroup;
        expect(testGroup).toBeDefined();
        expect(Object.keys(testGroup.controls).length).toEqual(1);

        const testTextBox = testGroup.get('testTextBox');
        expect(testTextBox.valid).toBeTruthy();

    });

    it('should throw error when no key is provided in control', () => {
        const parentFormGroup = new FormGroup({});
        expect(
            function () {
                service.toFormGroup(
                    new GroupControl({
                        key: 'testGroup',
                        groupControls: [
                            new TextBoxControl({
                                label: 'testLabel'
                            })
                        ]
                    }),
                    parentFormGroup
                );
            }
        ).toThrow();
    });

    it('should validate form group with one text box and a required validator', function () {
        const parentFormGroup = new FormGroup({});

        service.toFormGroup(
            new GroupControl({
                key: 'testGroup',
                groupControls: [
                    new TextBoxControl({
                        key: 'testTextBox',
                        label: 'testLabel',
                        validators: [
                            {
                                errorKey: 'required',
                                validator: Validators.required
                            }
                        ]
                    })
                ]
            }),
            parentFormGroup
        );

        const formGroup = parentFormGroup.get('testGroup').get('testTextBox') as FormControl;
        // for some reason a form starts in invalid state
        expect(formGroup.valid).toBeFalsy();
        expect(formGroup.dirty).toBeFalsy();
        formGroup.setValue('test');
        expect(formGroup.valid).toBeTruthy();
    });

    it('should create FormArray with validators from ArrayControl', function () {

        const arrayControl = new ArrayControl({
            key: 'petrols',
            arrayControls: [
                new GroupControl({
                    key: 'petrol1',
                    groupControls: [
                        new TextBoxControl({
                            key: 'testTextBox1',
                            label: 'testLabel1'
                        })
                    ],
                    groupValidators: [
                        mockValidator(/EEE/i)
                    ]
                }),
                new GroupControl({
                    key: 'petrol2',
                    groupControls: [
                        new TextBoxControl({
                            key: 'testTextBox2',
                            label: 'testLabel2'
                        })
                    ]
                }),
                new TextBoxControl({
                    key: 'testArrayTextBox1',
                    label: 'testArrayLabel1'
                })
            ],
            arrayValidators: [
                mockValidator(/EEA/i)
            ]
        });

        const groupControl = new GroupControl({
            key: 'testGroup',
            groupControls: [
                arrayControl
            ]
        });

        const formGroup = service.toFormGroup(groupControl);

        expect(formGroup.get('petrols') instanceof FormArray).toBeTruthy();
        const formArray = formGroup.get('petrols') as FormArray;
        expect(formArray.controls.length).toEqual(3);
        expect(formArray.validator).not.toBeNull();
        expect(formArray.controls[0].validator).not.toBeNull();
        expect(formArray.controls[1].validator).toBeNull();

        expect(formArray.controls[2] instanceof FormControl).toBeTruthy();
    });
});

export function mockValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}
