import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedTableComponent } from './verified-table.component';

describe('VerifiedTableComponent', () => {
  let component: VerifiedTableComponent;
  let fixture: ComponentFixture<VerifiedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
