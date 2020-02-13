import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VactureFilterComponent } from './vacture-filter.component';

describe('VactureFilterComponent', () => {
  let component: VactureFilterComponent;
  let fixture: ComponentFixture<VactureFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VactureFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VactureFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
