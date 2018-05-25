import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorMessagesComponent} from './error-messages.component';
import {MessagesModule} from 'primeng/primeng';
import {FormGroup} from '@angular/forms';

describe('ErrorMessagesComponent', () => {
    let component: ErrorMessagesComponent;
    let fixture: ComponentFixture<ErrorMessagesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ErrorMessagesComponent],
            imports: [MessagesModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorMessagesComponent);
        component = fixture.componentInstance;
        component.relatedFormGroup = new FormGroup({});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
