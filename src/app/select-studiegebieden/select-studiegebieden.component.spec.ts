import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStudiegebiedenComponent } from './select-studiegebieden.component';

describe('SelectStudiegebiedenComponent', () => {
  let component: SelectStudiegebiedenComponent;
  let fixture: ComponentFixture<SelectStudiegebiedenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStudiegebiedenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStudiegebiedenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
