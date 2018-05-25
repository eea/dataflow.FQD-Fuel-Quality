import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutoCompleteModule, InputTextModule, MessagesModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesComponent} from './error-messages/error-messages.component';
import {ValidationService} from './validation/validation.service';
import {DynamicFormComponent} from './dynamic-form/dynamic-form.component';
import {DynamicFormControlComponent} from './dynamic-form-control/dynamic-form-control.component';
import {DynamicFormService} from './dynamic-form/dynamic-form.service';
import {GroupingService} from './grouping.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        AutoCompleteModule,
        InputTextModule,
        MessagesModule,
        CalendarModule
    ],
    declarations: [DynamicFormComponent, DynamicFormControlComponent, ErrorMessagesComponent],
    providers: [DynamicFormService, ValidationService, GroupingService],
    exports: [DynamicFormComponent, DynamicFormControlComponent, ErrorMessagesComponent]
})
export class DynamicFormsModule {
}
