import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedTableComponent } from './unverified-table.component';

describe('UnverifiedTableComponent', () => {
  let component: UnverifiedTableComponent;
  let fixture: ComponentFixture<UnverifiedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnverifiedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
