import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyVacaturesComponent } from './company-vacatures.component';

describe('CompanyVacaturesComponent', () => {
  let component: CompanyVacaturesComponent;
  let fixture: ComponentFixture<CompanyVacaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyVacaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyVacaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
