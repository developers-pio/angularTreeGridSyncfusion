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
  public areAllCollapsed: Boolean;
  public selectionSettings: SelectionSettingsModel;
  public dateFormatOptions: Object;
  public dateRule: Object;
  public numberRule: Object;
  public editing: Object;
  public stringRule: Object;
  public taskIdRule: Object;
  public pageSettings: Object;
  public rowDrop: Object;

  public recordsToDelete: Object[];
  public copiedRecords: Object[];
  public selectedRecords: Object[];

  constructor() {}

  ngOnInit(): void {
    if (!virtualData.length) {
      getData(1000);
    }
    this.data = virtualData;
    this.filterSettings = { type: 'Excel', hierarchyMode: 'None'};
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
      'ColumnChooser',
      'Filter',
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
      'Delete',
      // {
      //   iconCss: 'e-icons e-cut-record',
      //   text: 'Cut',
      //   target: '.e-content',
      //   id: 'recordCut'
      // },
      {
        iconCss: 'e-icons e-copy-record',
        text: 'Copy',
        target: '.e-content',
        id: 'recordCopy'
      },
      {
        iconCss: 'e-icons e-paste-record',
        text: 'Paste as Sibling',
        target: '.e-content',
        id: 'recordPasteAsSibling'
      }
    ];
    this.selectionSettings = { type: 'Single' };
    this.dateFormatOptions = { format: 'MM/dd/yyyy', type: 'date' };
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
      this.allowMultiSorting = !this.allowMultiSorting;
    }
  }

  contextMenuClick(args): void {
    if (args.item.id === 'multiSelectToggle') {
      this.selectionSettings.type === 'Multiple'
        ? (this.selectionSettings = { type: 'Single' })
        : (this.selectionSettings = { type: 'Multiple' });
    }

    if (args.item.id === 'collapseExpandToggle') {
      if(this.areAllCollapsed){
        this.treeGridObj.expandAll();
        this.areAllCollapsed = false;
      } else{
        this.treeGridObj.collapseAll();
        this.areAllCollapsed = true;
      }
    }

    // if (args.item.id === 'recordCut') {
    //   this.recordsToDelete = this.treeGridObj.getSelectedRecords();
    //   console.log(this.recordsToDelete)
    // }

    if (args.item.id === 'recordCopy') {
      this.copiedRecords = this.treeGridObj.getSelectedRecords();
    }

    if (args.item.id === 'recordPasteAsSibling') {
      // const selectedRecord = this.treeGridObj.getSelectedRecords()[0]
      console.log(args)
      // this.treeGridObj.addRecord(this.copiedRecords[0].taskData, args.rowInfo.rowData.index)
    }
  }
}
