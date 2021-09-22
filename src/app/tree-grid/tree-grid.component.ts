import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FilterSettingsModel,
  SortSettingsModel,
  EditSettingsModel,
  ToolbarItems,
  SelectionSettingsModel
} from '@syncfusion/ej2-angular-treegrid';
import { getData, virtualData } from '../data-source';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomTreeGridComponent implements OnInit {
  public data: Object[];
  public filterSettings: FilterSettingsModel;
  public item: number[] = [1, 2, 3, 4, 5];
  public sortSettings: SortSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public contextMenuItems: Object[];
  public selectionOptions: SelectionSettingsModel;
  public dateFormatOptions: Object;
  public dateRule: Object;
  public numberRule: Object;
  public editing: Object;
  public stringRule: Object;
  public taskidRule: Object;

  constructor() {}

  ngOnInit(): void {
    if (!virtualData.length) {
      getData(1000);
    }
    this.data = virtualData;
    this.filterSettings = { type: 'Menu' };
    this.sortSettings = {
      columns: [{ field: 'taskID', direction: 'Ascending' }]
    };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      showDeleteConfirmDialog: true,
      mode: 'Dialog'
    };
    this.toolbarOptions = ['Add', 'Edit', 'Delete'];
    this.contextMenuItems = ['Edit', 'Delete'];
    this.selectionOptions = { type: 'Multiple' };
    this.dateFormatOptions = { format: 'M/d/yyyy', type: 'date' };
    this.dateRule = { required: true, date: true };
    this.numberRule = { required: true, number: true, min: 0 };
    this.editing = { params: { format: 'n' } };
    this.stringRule = { required: true };
    this.taskidRule = { required: true, number: true };
  }

  customizeCell(args) {
    if (
      args.column.field === 'progress' &&
      +args.cell.innerHTML > 90 &&
      +args.cell.innerHTML <= 100
    ) {
      args.cell.setAttribute(
        'style',
        'background-color:#336c12;color:white;text-align:center;'
      );
    } else if (+args.cell.innerHTML > 20 && args.column.field === 'progress') {
      args.cell.setAttribute(
        'style',
        'background-color:#7b2b1d;color:white;text-align:center;'
      );
    }
  }
}
