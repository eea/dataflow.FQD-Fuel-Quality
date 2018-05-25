import {inject, TestBed} from '@angular/core/testing';

import {FuelContactsService} from './fuel-conacts.service';

xdescribe('FuelContactsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FuelContactsService]
        });
    });

    it('should be created', inject([FuelContactsService], (service: FuelContactsService) => {
        expect(service).toBeTruthy();
    }));
});
