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
import { IEditCell } from '@syncfusion/ej2-angular-grids';
import { addClass } from '@syncfusion/ej2-base';
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
  public frozenColumns: number;
  public allowColumnFreezing: Boolean;
  public editSettings: EditSettingsModel;
  public toolbarOptions: ToolbarItems[];
  public contextMenuItems: Object[];
  public columnMenuItems: Object[];
  public allowMultiSorting: Boolean;
  public allowFiltering: Boolean;
  public areAllCollapsed: Boolean;
  public selectionSettings: SelectionSettingsModel;
  public dateFormatOptions: Object;
  public dateRule: Object;
  public numberRule: Object;
  public editing: IEditCell;
  public stringRule: Object;
  public taskIdRule: Object;
  public pageSettings: Object;
  public rowDrop: Object;

  constructor() {}

  ngOnInit(): void {
    if (!virtualData.length) {
      getData(1000);
    }
    this.data = virtualData;
    this.frozenColumns = 2;
    this.allowColumnFreezing = true;
    this.allowFiltering = true;
    this.filterSettings = { type: 'Excel', hierarchyMode: 'Parent' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      showDeleteConfirmDialog: true,
      mode: 'Dialog' // 'Batch' for saving multiple edit or delete actions
    };
    this.toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.allowMultiSorting = true;
    this.areAllCollapsed = false;
    this.columnMenuItems = [
      {
        text: 'Text Alignment',
        items: [
          {
            iconCss: 'e-icons e-align-left',
            text: 'Left',
            target: '.e-headercontent',
            id: 'alignLeft'
          },
          {
            iconCss: 'e-icons e-align-center',
            text: 'Center',
            target: '.e-headercontent',
            id: 'alignCenter'
          },
          {
            iconCss: 'e-icons e-align-right',
            text: 'Right',
            target: '.e-headercontent',
            id: 'alignRight'
          }
        ]
      },
      'ColumnChooser',
      'Filter',
      {
        iconCss: 'e-icons e-filter',
        text: 'Filter On/Off',
        target: '.e-headercontent',
        id: 'filterToggle'
      },
      {
        iconCss: 'e-icons e-freeze',
        text: 'Freeze On/Off',
        target: '.e-headercontent',
        id: 'freezeToggle'
      },
      {
        iconCss: 'e-icons e-sort',
        text: 'Multi-Sort On/Off',
        target: '.e-headercontent',
        id: 'multiSortToggle'
      }
    ];
    this.contextMenuItems = [
      {
        iconCss: 'e-icons e-collapse-all',
        text: 'Collapse/Expand All',
        target: '.e-content',
        id: 'collapseExpandToggle'
      },
      {
        iconCss: 'e-icons e-select-all',
        text: 'Multi-Select On/Off',
        target: '.e-content',
        id: 'multiSelectToggle'
      },
      'Edit',
      'Delete'
    ];
    this.selectionSettings = { type: 'Single' };
    this.dateFormatOptions = { format: 'MM/dd/yyyy', type: 'date' };
    this.dateRule = { required: true, date: true };
    this.numberRule = { required: true, number: true, min: 0 };
    this.editing = {
      params: { format: 'N', validateDecimalOnType: true, decimals: 0 }
    };
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
      this.allowMultiSorting = !this.allowMultiSorting;
    }

    if (args.item.id === 'filterToggle') {
      this.allowFiltering = !this.allowFiltering;
    }

    if (args.item.id === 'freezeToggle') {
      const currentColumnIndex = args.column.index;
      if (this.allowColumnFreezing) {
        if (this.frozenColumns === currentColumnIndex) {
          this.allowColumnFreezing = !this.allowColumnFreezing;
          this.frozenColumns = 0;
        } else {
          this.frozenColumns = currentColumnIndex;
        }
      } else {
        this.allowColumnFreezing = !this.allowColumnFreezing;
        this.frozenColumns = currentColumnIndex;
      }
    }

    if (args.item.id === 'alignLeft') {
      this.treeGridObj.getColumnByField(args.column.field).textAlign = 'Left';
      this.treeGridObj.refreshColumns();
    }

    if (args.item.id === 'alignCenter') {
      this.treeGridObj.getColumnByField(args.column.field).textAlign = 'Center';
      this.treeGridObj.refreshColumns();
    }

    if (args.item.id === 'alignRight') {
      this.treeGridObj.getColumnByField(args.column.field).textAlign = 'Right';
      this.treeGridObj.refreshColumns();
    }
  }

  contextMenuClick(args): void {
    if (args.item.id === 'multiSelectToggle') {
      this.selectionSettings.type === 'Multiple'
        ? (this.selectionSettings = { type: 'Single' })
        : (this.selectionSettings = { type: 'Multiple' });
    }

    if (args.item.id === 'collapseExpandToggle') {
      if (this.areAllCollapsed) {
        this.treeGridObj.expandAll();
        this.areAllCollapsed = false;
      } else {
        this.treeGridObj.collapseAll();
        this.areAllCollapsed = true;
      }
    }
  }
}
