import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VactureDetailComponent } from './vacture-detail.component';

describe('VactureDetailComponent', () => {
  let component: VactureDetailComponent;
  let fixture: ComponentFixture<VactureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VactureDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VactureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
