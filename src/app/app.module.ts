import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import {
  FreezeService,
  SortService,
  FilterService,
  EditService,
  ToolbarService,
  ResizeService,
  ReorderService,
  ContextMenuService,
  InfiniteScrollService,
  ColumnMenuService,
  SelectionService,
  RowDDService
} from '@syncfusion/ej2-angular-treegrid';

import { AppComponent } from './app.component';
import { CustomTreeGridComponent } from './tree-grid/tree-grid.component';

@NgModule({
  declarations: [AppComponent, CustomTreeGridComponent],
  imports: [BrowserModule, TreeGridModule],
  providers: [
    FreezeService,
    SortService,
    FilterService,
    EditService,
    ToolbarService,
    ResizeService,
    ReorderService,
    ContextMenuService,
    InfiniteScrollService,
    ColumnMenuService,
    SelectionService,
    RowDDService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
