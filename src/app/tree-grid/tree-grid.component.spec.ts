import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTreeGridComponent } from './tree-grid.component';

describe('CustomTreeGridComponent', () => {
  let component: CustomTreeGridComponent;
  let fixture: ComponentFixture<CustomTreeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTreeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTreeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
