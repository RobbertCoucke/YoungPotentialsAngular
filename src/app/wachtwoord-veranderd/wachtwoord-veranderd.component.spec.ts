import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WachtwoordVeranderdComponent } from './wachtwoord-veranderd.component';

describe('WachtwoordVeranderdComponent', () => {
  let component: WachtwoordVeranderdComponent;
  let fixture: ComponentFixture<WachtwoordVeranderdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WachtwoordVeranderdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WachtwoordVeranderdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
