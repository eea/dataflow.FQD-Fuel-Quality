import {TestBed} from '@angular/core/testing';

import {ValidationService} from './validation.service';
import {TextBoxControl} from '../controls/textbox-control';
import {FormControl, FormGroup, Validators} from '@angular/forms';


describe('ValidationService', () => {
    let service: ValidationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ValidationService]
        });
        service = TestBed.get(ValidationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should generate correct form error structure for required validator', () => {
        const control = new TextBoxControl({
            key: 'testTextBox1',
            validators: [
                {
                    errorKey: 'required',
                    validator: Validators.required
                }
            ]
        });
        const formErrorStructure = service.generateFormErrorStructure(control);

        const expected = [{
            errorKey: 'required',
            errorMessage: ''
        }];
        expect(formErrorStructure).toEqual(expected);
    });

    it('should generate correct form error structure for two validators', () => {
        const control = new TextBoxControl({
            key: 'testTextBox1',
            validators: [
                {
                    errorKey: 'required',
                    validator: Validators.required
                },
                {
                    errorKey: 'minlength',
                    validator: Validators.minLength(5)
                }
            ]
        });
        const formErrorStructure = service.generateFormErrorStructure(control);

        const expected = [{
            errorKey: 'required',
            errorMessage: ''
        },
            {
                errorKey: 'minlength',
                errorMessage: ''
            }];

        expect(formErrorStructure).toEqual(expected);
    });

    it('should generate validation messages structure for two validators', () => {
        const control = new TextBoxControl({
            key: 'testTextBox1',
            validators: [
                {
                    errorKey: 'required',
                    validator: Validators.required
                },
                {
                    errorKey: 'minlength',
                    validator: Validators.minLength(5),
                    validationMessage: 'The minimum length is 5'
                }
            ]
        });

        const validationMessages = service.generateValidationMessages(control);

        const expected = [
            {
                errorKey: 'required',
                errorMessage: 'This field is required'
            },
            {
                errorKey: 'minlength',
                errorMessage: 'The minimum length is 5'
            }
        ];

        expect(validationMessages).toEqual(expected);
    });

    it('should update form errors correctly for a simple form group with one text box', () => {
        const textBoxControl = new TextBoxControl({
            key: 'testTextBox1',
            validators: [
                {
                    errorKey: 'email',
                    validator: Validators.email,
                    validationMessage: 'Incorrect email format'
                },
                {
                    errorKey: 'minlength',
                    validator: Validators.minLength(5),
                    validationMessage: 'The minimum length is 5'
                }
            ]
        });

        const formControl = new FormControl('', [Validators.email, Validators.minLength(5)]);
        const formGroup = new FormGroup(
            {
                'testTextBox1': formControl
            });
        formGroup.patchValue({'testTextBox1': 'a'});
        formGroup.get('testTextBox1').markAsDirty();

        const formErrorStructure = service.generateFormErrorStructure(textBoxControl);
        const validationMessages = service.generateValidationMessages(textBoxControl);

        const formErrors = service.updateFormErrors(
            formGroup,
            [{
                controlKey: 'testTextBox1',
                errors: formErrorStructure
            }],
            [{
                controlKey: 'testTextBox1',
                validationTuple: validationMessages
            }]);

        expect(formErrors).toEqual([{
            controlKey: 'testTextBox1',
            errors: [{
                errorKey: 'email',
                errorMessage: 'Incorrect email format'
            }, {
                errorKey: 'minlength',
                errorMessage: 'The minimum length is 5'
            }]
        }]);
    })
    ;

})
;
