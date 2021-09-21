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
      mode: 'Dialog'
    };
    this.toolbarOptions = ['Add', 'Edit', 'Delete'];
    this.contextMenuItems = ['Edit', 'Delete'];
    this.selectionOptions = { type: 'Multiple' };
  }
}
