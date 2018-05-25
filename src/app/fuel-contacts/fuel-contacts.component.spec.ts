import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FuelContactsComponent} from './fuel-contacts.component';

xdescribe('FuelContactsComponent', () => {
    let component: FuelContactsComponent;
    let fixture: ComponentFixture<FuelContactsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelContactsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelContactsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
