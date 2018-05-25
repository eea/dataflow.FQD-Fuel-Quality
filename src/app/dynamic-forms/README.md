# Dynamic Forms Module

This is an attempt to implement the official Angular paradigm of [dynamic forms](https://angular.io/guide/dynamic-form).

>CAUTION: The following guide assumes that you have read and understand the official Angular documentation concerning dynamic forms.
It also assumes some familiarity with [Angular Reactive Forms](https://angular.io/guide/reactive-forms) concepts.

  * [Basic Usage](#basic-usage)
    + [1. Import module](#1-import-module)
    + [2. Define the form dynamic controls](#2-define-the-form-dynamic-controls)
    + [3. Add a DynamicFormComponent to your template](#3-add-a-dynamicformcomponent-to-your-template)
  * [DynamicFormComponent input properties](#dynamicformcomponent-input-properties)
  * [DynamicFormComponent output properties](#dynamicformcomponent-output-properties)
  * [Form Groups](#form-groups)
  * [Unrendered controls](#unrendered-controls)
  * [Form Arrays](#form-arrays)
    + [Rendering](#rendering)
  * [Validation](#validation)
    + [Setting up validators](#setting-up-validators)
    + [Showing validation errors](#showing-validation-errors)
    + [Marking tabs as invalid](#marking-tabs-as-invalid)

## Basic Usage

### 1. Import module

To start developing with dynamic forms the module must be imported in your module:

```typescript
import {DynamicFormsModule} from './dynamic-forms/dynamic-forms.module';
// ...

@NgModule({

    imports: [
        ReactiveFormsModule,
        DynamicFormModule,
        // ...
    ]
})
```
### 2. Define the form dynamic controls

At the time of writing the following type of dynamic controls are supported:

* ArrayControl
* AutocompleteControl
* CalendarControl
* GroupControl
* TextBoxControl

These controls all extend from a BaseControl (which defines some generic configuration options, e.g. 'label')

These classes define their control-specific options and they are all rendered form the `DynamicFormComponent` using PrimeNG components. 

For example, the `AutocompleteControl` defines options such as `searchFn` which is a reference to the function that must be called 
to search/filter the data on the autocomplete component.

The central Angular component of the dynamic forms module is the `DynamicFormComponent` which expects a `GroupControl` and 
a `FormGroup` as inputs.

To create the `FormGroup` we use the `DynamicFormService` provided by the module. For example the following call to the service using
the defined GroupControl
will create a `FormGroup` with one text field:

```typescript
const groupControl = new GroupControl({
    key:'testGroupControl',
    groupControls: [
        new TextBoxControl({
                key: 'textBoxExample',
                label: 'Text Box Example',
            })
    ]
});

const formGroup = this.dynamicFormService.toFormGroup(groupControl);
``` 
NOTE: The `toFormGroup` method takes a second optional FormGroup parameter `parent` in case we need the new FormGroup 
to be added as a control to a parent FormGroup.

As you can see the Dynamic Controls are used as metadata objects that allow the developer to centraly define all the configuration needed
for a Form Control (basic properties like label text, validators, and even layout properties i.e. `controlCssClasses`)

### 3. Add a DynamicFormComponent to your template

For the simple example above you just need to add the dynamic form component to your template referencing the groupControl 
and the FormGroup:

```ts
<dynamic-form [groupControl]="groupControl" [formGroup]="formGroup">

</dynamic-form>
```

This will render the text-box in your page together with the specified label.

> NOTE: For complex Forms we advise that the Dynamic Controls (e.g. GroupControl) is created in a service and not directly inside
the component for better separation of concerns.

## DynamicFormComponent input properties

The following properties can be passed to the dynamic form component (besides `groupControl` and `formGroup`):

* `value`: The data model object that we want to bind the form value

## DynamicFormComponent output properties

* `formSubmit`: In case we want an event to be emitted when the form is submitted
>NOTE: This is not being used at the moment, so it is not tested.

## Form Groups in detail

One important feature of Angular reactive forms is the ability to group controls into groups.

This is very useful for logical grouping but also for adding validators in the group level (cross-field validation,
will be discussed in a separate section).

The dynamic form module supports the usage of groups with the GroupControl.

To use the GroupControl, as we saw before, you create it as so:

```typescript
new GroupControl({
    key: 'groupExample',
    groupControls: [new GroupControl{
        key: 'nestedGroup',
        groupControls: [...]
    }],
    // ...
});
```

> Note: if the `groupControls` property contains a nested `GroupControl` then a nested `DynamicFormComponent` will be rendered 
inside the original `DynamicFormComponent`.

The GroupControl has some very useful properties you can set:

* `unrenderedControls`: This is a separate array of controls which is used to add controls that will be rendered manually
(using for example the dynamic-form-control component explicitly)

* `groupValidators`: This is an array of ValidatorFns (Angular validation functions) that will be added to the FormGroup level 
for cross-field validation.

* `showErrors`: If set to true the FormGroup errors will be shown on top of the form

* `showNestedFormGroupErrors`: If set to true all the *group* errors of the FormGroup children will be shown 
(together with the FormGroup errors)

* `controlsPerRow`: In case we want the form to be rendered with multiple controls per row we can set a number here. 
The DynamicFormComponent uses the PrimeNG Grid CSS framework to render the layout correctly

## Unrendered group controls

Using the `unrenderedControls` property of the `GroupControl` we can create FormControls which are not rendered together with the rest 
of the `groupControls`. This was initially added as a feature because we might want to give complete control to the user as to where 
the control is rendered (without having to revert back to reactive forms). 
To render manually the control the `DynamicFormControl` component must be used:

```ts
 <!--NOTE: this ui-g class is absolutely required so as to not break the grid layout!-->
        <div class="ui-g">
            <dynamic-form-control [control]="textBoxControl" [form]="formGroup">
            </dynamic-form-control>
        </div>
```

> NOTE: The custom controls feature has been extended to support the requirement of creating nested FormGroups 
that will not be rendered (see Form Array section).

## Form Arrays

Form arrays are useful when you don't know beforehand how many controls will be needed and when they can be added dynamically at runtime.

To create a form array we first need to create an ArrayControl:

```typescript
let array = new ArrayControl({
    key: 'arrayExample',
    arrayControls: [
        new GroupControl(...),
        // ...
    ]
});
```

The difference with other kind of controls is that the array controls are not rendered automatically but rather on demand.

If we provide the ArrayControl in the `unrenderedControls` of a GroupControl object, the controls of the array will be created 
and added to a new Angular FormArray. But the controls will **NOT** be rendered.

### Rendering array controls

The rendering of the array is left to the user. To render for example a FormGroup which was created inside a FormArray, 
we must manually create a new `DynamicFormComponent` and explicitly pass the FormGroup and the `GroupControl`. 

To add a new element in the array after it was created initially (dynamic addition of array elements), 
the `DynamicFormService` must be used. The `toFormGroup` function must be called with arguments the new FormGroup and the FormArray 
(so as to add the new FormGroup to its parent):

```typescript
this.dynamicFormService.toFormGroup(
    new GroupControl({
        key: 'petrol ' + i,
        unrenderedControls: petrolGroupControl.groupControls,
        groupValidators: petrolGroupControl.groupValidators,
        //...
    }),
    petrolsArray
    );
```

## Validation

The module supports centralised validation management using the Dynamic Controls. 

### Setting up validators

This is achieved initially by defining all validation rules when defining the Dynamic Form Controls. 
Validations can be added in the level of a GroupControl (`groupValidators`), ArrayControl (`arrayValidators`) and individual input 
controls (`validators`). In the case of group and array the validators are defined as an array of Angular `ValidatorFn` functions,
i.e.:

```typescript
new GroupControl({
    groupValidators: [
        this.petrolFormValidator.numOfSampleFrequencyValidation(),
    ]
})
```
When setting individual control validators the definition differs as the array of validators must contain our own custom validator 
configuration object `ValidationConfig`. This way the user can define at the same place the validator, a placeholder for the error 
(`errorKey` property) and the exact validation error message:

```typescript
new TextBoxControl({
    key: '...',
    validators: [
        {
            errorKey: 'minlength',
            validator: Validators.minLength(5),
            validationMessage: 'Min length is 5'
        }
    ]
})
 
```

NOTE: This differentiation between group/array validators and individual control validators might need to be addressed...

### Showing validation errors

The `GroupControl` has two configuration properties concerning validation errors: 

If `showErrors` is set to true the FormGroup errors of the specific dynamic form will be shown on top of the form. 
If `showNestedErrors` is set to true all the nested group errors will also be shown at the top.
This is done using our own custom error-messages component

The dynamic form control component is responsible for showing individual control components, by aggregating all field error messages
in one and showing it bellow the field.
 
### Marking tabs as invalid
 
>NOTE: This feature is under development, not stable yet.
 
There is also the possibility to mark a PrimeNG tab as invalid when an error occurs in its FormGroup (checking recursively in all nested FormGroups).
This is achieved using the `tabForm` directive, passing the FormGroup we want the tab to check for errors:
 
 ```ts
<p-tabPanel [tabForm]="formGroup">
// ...
</p-tabPanel>
```

