export class Petrol {
    id: string;
    basicPetrolInfo: {
        country: string;
        reportingYear: number;
        period: string;
        parentFuelGrade: string;
        nationalFuelGrade: string;
        summerPeriodNorA: string;
        maximumBioethanolContent: string;
    };
    researchOctaneNumber: ReportResult;
    motorOctaneNumber: ReportResult;
    vapourPressure: ReportResult;
    distillationEvaporated100: ReportResult;
    distillationEvaporated150: ReportResult;
    hydrocarbonOlefins: ReportResult;
    hydrocarbonAromatics: ReportResult;
    hydrocarbonBenzene: ReportResult;
    oxygenContent: ReportResult;
    oxygenContent2: ReportResult;
    methanol: ReportResult;
    ethanol: ReportResult;
    isoPropylAlcohol: ReportResult;
    tertButylAlcohol: ReportResult;
    isoButylAlcohol: ReportResult;
    ethers: ReportResult;
    sulphurContent: ReportResult;
    leadContent: ReportResult;
    magnanese: ReportResult;
    sampleFrequency: MonthSample;
}

export class ReportResult {
    unit: string;
    numOfSamples: number;
    min: number;
    max: number;
    median: number;
    mean: number;
    standardDeviation: number;
    toleranceLimit: number;
    sampleValue25: number;
    sampleValue75: number;
    nationalMin: number;
    nationalMax: number;
    directiveMin: number;
    directiveMax: number;
    method: string;
    date: string;
}

export class MonthSample {
    // month: MonthEnum;
    totalMonthValue: number;
}

// export enum MonthEnum {
//     January = 1,
//     February,
//     March,
//     April,
//     May,
//     June,
//     July,
//     August,
//     September,
//     Octomber,
//     November,
//     December
// }
