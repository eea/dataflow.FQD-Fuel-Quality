import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SampleFrequencyComponent} from './sample-frequency.component';

xdescribe('SampleFrequencyComponent', () => {
    let component: SampleFrequencyComponent;
    let fixture: ComponentFixture<SampleFrequencyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SampleFrequencyComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SampleFrequencyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
