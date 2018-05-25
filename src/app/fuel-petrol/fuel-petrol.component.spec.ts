import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FuelPetrolComponent} from './fuel-petrol.component';

xdescribe('FuelPetrolComponent', () => {
    let component: FuelPetrolComponent;
    let fixture: ComponentFixture<FuelPetrolComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelPetrolComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelPetrolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
