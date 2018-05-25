import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {FuelData} from './fuel-data';

@Injectable()
export class FuelDataService {

    constructor(private http: HttpClient) {
    }

    getFuelData(): Observable<FuelData> {
        return this.http.get<FuelData>('../../assets/fuelData.json');
    }

}
