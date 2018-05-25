import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReportingResultsComponent} from './reporting-results.component';

xdescribe('ReportingResultsComponent', () => {
    let component: ReportingResultsComponent;
    let fixture: ComponentFixture<ReportingResultsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReportingResultsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportingResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
