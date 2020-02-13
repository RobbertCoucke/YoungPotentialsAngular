import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacturesComponent } from './vactures.component';

describe('VacturesComponent', () => {
  let component: VacturesComponent;
  let fixture: ComponentFixture<VacturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
