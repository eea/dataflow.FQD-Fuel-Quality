import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FuelPetrolTabComponent} from './fuel-petrol-tab.component';

xdescribe('FuelPetrolTabComponent', () => {
    let component: FuelPetrolTabComponent;
    let fixture: ComponentFixture<FuelPetrolTabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FuelPetrolTabComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FuelPetrolTabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
