import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacAnonymousComponent } from './add-vac-anonymous.component';

describe('AddVacAnonymousComponent', () => {
  let component: AddVacAnonymousComponent;
  let fixture: ComponentFixture<AddVacAnonymousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVacAnonymousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacAnonymousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
