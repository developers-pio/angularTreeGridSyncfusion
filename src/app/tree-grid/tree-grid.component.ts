import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  TreeGridComponent,
  FilterSettingsModel,
  EditSettingsModel,
  ToolbarItems,
  SelectionSettingsModel
} from '@syncfusion/ej2-angular-treegrid';
import {
  QueryCellInfoEventArgs,
  ColumnMenuClickEventArgs
} from '@syncfusion/ej2-grids';
import { addClass } from '@syncfusion/ej2-base';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import { getData, virtualData } from '../data-source';

@Component({
  selector: 'app-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomTreeGridComponent implements OnInit {
  @ViewChild('treegrid')
  public treeGridObj: TreeGridComponent;

  public data: Object[];
  public filterSettings: FilterSettingsModel;
  public item: number[] = [1, 2, 3, 4, 5];
  public editSettings: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public contextMenuItems: Object[];
  public columnMenuItems: Object[];
  public allowMultiSorting: Boolean;
  public selectionSettings: SelectionSettingsModel;
  public dateFormatOptions: Object;
  public dateRule: Object;
  public numberRule: Object;
  public editing: Object;
  public stringRule: Object;
  public taskIdRule: Object;
  public pageSettings: Object;
  public rowDrop: Object;

  public selectedRecords: Object[];

  // Cut
  private moveRow: any = null;
  // Copy/Paste
  private clone: any = null;

  constructor() {}

  ngOnInit(): void {
    if (!virtualData.length) {
      getData(1000);
    }
    this.data = virtualData;
    this.filterSettings = { type: 'Excel' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      showDeleteConfirmDialog: true,
      mode: 'Dialog' // 'Batch' for saving multiple edit or delete actions
    };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.allowMultiSorting = false;
    this.columnMenuItems = [
      'ColumnChooser',
      'Filter',
      {
        iconCss: 'e-icons e-sort',
        text: 'Multi-Sort On/Off',
        target: '.e-content',
        id: 'multiSortToggle'
      }
    ];
    this.contextMenuItems = [
      'Edit',
      'Delete',
      {
        iconCss: 'e-icons e-select-all',
        text: 'Multi-Select On/Off',
        target: '.e-content',
        id: 'multiSelectToggle'
      },
      {
        iconCss: 'e-icons e-cut-record',
        text: 'Cut',
        target: '.e-content',
        id: 'recordCut'
      },
      {
        iconCss: 'e-icons e-copy-record',
        text: 'Copy',
        target: '.e-content',
        id: 'recordCopy'
      },
      {
        iconCss: 'e-icons e-paste-record',
        text: 'Paste',
        target: '.e-content',
        id: 'recordPaste'
      }
    ];
    this.selectionSettings = { enableToggle: true };
    this.dateFormatOptions = { format: 'M/d/yyyy', type: 'date' };
    this.dateRule = { required: true, date: true };
    this.numberRule = { required: true, number: true, min: 0 };
    this.editing = { params: { format: 'n' } };
    this.stringRule = { required: true };
    this.taskIdRule = { required: true, number: true };
    this.pageSettings = { pageSize: 30 };
  }

  customizeCell(args: QueryCellInfoEventArgs) {
    if (args.column.field === 'progress') {
      if (args.data[args.column.field] <= 4) {
        addClass([args.cell.querySelector('.bar')], ['progressdisable']);
      }
      (args.cell.querySelector('.bar') as HTMLElement).style.width =
        args.data[args.column.field] + '%';
      args.cell.querySelector('.barlabel').textContent =
        args.data[args.column.field] + '%';
    }
    if (args.column.field === 'duration') {
      if (+args.cell.innerHTML <= 1) {
        args.cell.innerHTML = args.cell.innerHTML + ' hr';
      } else {
        args.cell.innerHTML = args.cell.innerHTML + ' hrs';
      }
    }
  }

  columnMenuClick(args?: ColumnMenuClickEventArgs): void {
    if (args.item.id === 'multiSortToggle') {
      if (this.allowMultiSorting) {
        this.allowMultiSorting = false;
      } else {
        this.allowMultiSorting = true;
      }
    }
  }

  contextMenuClick(args?: MenuEventArgs): void {
    console.log(args);
    if (args.item.id === 'multiSelectToggle') {
      if (this.selectionSettings.type === 'Multiple') {
        this.selectionSettings = { type: 'Single' };
      } else {
        this.selectionSettings = { type: 'Multiple' };
      }
    }
    if (args.item.id === 'recordCopy') {
      // this.treeGridObj.copy();
      this.selectedRecords = this.treeGridObj.getSelectedRecords();
    }

    if (args.item.id === 'recordPaste') {
      console.log(this.selectedRecords);
      // this.treeGridObj.paste(dataToPaste);
    }
  }
}
