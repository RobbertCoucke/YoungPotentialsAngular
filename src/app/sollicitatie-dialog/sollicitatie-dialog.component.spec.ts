import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SollicitatieDialogComponent } from './sollicitatie-dialog.component';

describe('SollicitatieDialogComponent', () => {
  let component: SollicitatieDialogComponent;
  let fixture: ComponentFixture<SollicitatieDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SollicitatieDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SollicitatieDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
