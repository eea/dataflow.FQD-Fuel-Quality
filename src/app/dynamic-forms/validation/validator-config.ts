import {ValidatorFn} from '@angular/forms';

export interface ValidatorConfig {
    errorKey: string;
    validator: ValidatorFn;
    validationMessage?: string;
}
