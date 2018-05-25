import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'editable-table',
    templateUrl: './editable-table.component.html',
    styleUrls: ['./editable-table.component.css']
})
export class EditableTableComponent implements OnInit {

    @Input() hotId;

    @Input() hotTableSettings;

    @Output() rowsChanged: EventEmitter<any[]> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * Adds each unique row to the rowsChanged array.
     *
     * $event.params[0] is an array and each of its entries is an array of which the first element is the changed row.
     *
     * @param $event
     */
    markRowChanged($event) {
        const changedRows = [];
        if ($event.params[0]) {
            $event.params[0].forEach(change => {
                const rowChanged = change[0];
                if (changedRows.findIndex(row => row === rowChanged) === -1) {
                    changedRows.push(rowChanged);
                }
            });
        }
        this.rowsChanged.emit(changedRows);
    }

}
