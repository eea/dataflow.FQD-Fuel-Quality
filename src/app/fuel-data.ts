import {Contacts} from './fuel-contacts/fuel-contacts';
import {Petrol} from './fuel-petrol/petrol';


export interface NestedFormData {
    testField1: string;
    testField2: string;
    calendarField1: string;
}


export interface FuelData {
    contacts: Contacts;
    petrol: FuelPetrol;
    nestedFormValidation: NestedFormData;
}

export interface FuelPetrol {
    country: string;
    reportingYear: number;
    nationalFuelGrade: string;
    petrols: Petrol[];
}
