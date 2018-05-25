import {inject, TestBed} from '@angular/core/testing';

import {ReportingResultsService} from './reporting-results.service';

describe('ReportingResultsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReportingResultsService]
        });
    });

    it('should be created', inject([ReportingResultsService], (service: ReportingResultsService) => {
        expect(service).toBeTruthy();
    }));
});
