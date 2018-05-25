import {NestedFormData} from '../fuel-data';

export class Contacts {
    country: string;
    reportingYear: string;
    dateReportCompleted: Date;
    organisationResponsibleForReport: string;
    organisationAddress: Address;
    personResponsibleForReport: string;
    personInfo: PersonInfo;
    generalSummary: string;
    nestedFormGroup: NestedFormData;

}

export class Address {
    street: string;
    city: string;
    postcode: string;
}


export class PersonInfo {
    phoneNumber: string;
    email: string;
}
