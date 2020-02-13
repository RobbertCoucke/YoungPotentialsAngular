import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VactureItemComponent } from './vacture-item.component';

describe('VactureItemComponent', () => {
  let component: VactureItemComponent;
  let fixture: ComponentFixture<VactureItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VactureItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VactureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
