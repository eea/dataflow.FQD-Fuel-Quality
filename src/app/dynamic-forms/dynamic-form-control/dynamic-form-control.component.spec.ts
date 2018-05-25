import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicFormControlComponent} from './dynamic-form-control.component';
import {AutoCompleteModule, CalendarModule, InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TextBoxControl} from '../controls/textbox-control';
import {AutocompleteControl} from '../controls/autocomplete-control';

describe('DynamicFormControlComponent', () => {
    let component: DynamicFormControlComponent;
    let fixture: ComponentFixture<DynamicFormControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicFormControlComponent],
            imports: [
                ReactiveFormsModule,
                ButtonModule,
                AutoCompleteModule,
                InputTextModule,
                CalendarModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicFormControlComponent);
        component = fixture.componentInstance;
        component.control = new TextBoxControl({
            key: 'testTextBox1',
            label: 'testTextBox1',
        });
        component.formGroup = new FormGroup({'testTextBox1': new FormControl('')});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call filter method when available', () => {
        component.control = new AutocompleteControl({
            key: 'testAutocomplete1',
            label: 'testAutocomplete1',
            suggestions: <any>[],
            searchFn: () => {
            },
            suggestionField: 'name',

        });
        spyOn(component.control as AutocompleteControl, 'filter');
        component.filter('');
        expect(component.control['filter']).toHaveBeenCalled();
    });
});
