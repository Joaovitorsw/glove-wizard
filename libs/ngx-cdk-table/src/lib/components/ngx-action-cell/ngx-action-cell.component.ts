import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import {
  NgxTableData,
  TableActionComponent,
  TableEvent,
} from '../../models/interface/table';

@Component({
  selector: 'glove-wizard-ngx-action-cell',
  templateUrl: './ngx-action-cell.component.html',
  styleUrls: ['./ngx-action-cell.component.scss'],
})
export class NgxActionCellComponent<T> implements TableActionComponent<T> {
  constructor(readonly changeDetectorRef: ChangeDetectorRef) {}
  eventAction = new EventEmitter<TableEvent<T>>();
  element: NgxTableData<T>;
  eventType: string;
  hasAction: boolean;

  emitEvent() {
    this.eventType = this.getEventType();
    this.eventAction.emit({ event: this.eventType, element: this.element });
  }
  canAdd() {
    const { selected, qtd, parcelas } = this.element;
    const hasRequiredFields = selected && +qtd > 0 && +parcelas > 0;
    return hasRequiredFields;
  }

  getEventType() {
    const { editable } = this.element;

    return editable ? 'add' : 'delete';
  }

  getToolTipMessage() {
    const { editable } = this.element;

    return editable
      ? 'Esta ação irá adicionar um cliente a triagem'
      : 'Esta ação irá remover um cliente da triagem';
  }

  getActionIcon() {
    this.eventType = this.getEventType();
    return this.eventType;
  }
}
