import {inject, TestBed} from '@angular/core/testing';
import {FuelDataService} from './fuel-data.service';


xdescribe('PetrolService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FuelDataService]
        });
    });

    it('should be created', inject([FuelDataService], (service: FuelDataService) => {
        expect(service).toBeTruthy();
    }));
});
