import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgFormInputComponent} from './ng-form-input.component';

describe('NgFormInputComponent', () => {
    let component: NgFormInputComponent;
    let fixture: ComponentFixture<NgFormInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgFormInputComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgFormInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
