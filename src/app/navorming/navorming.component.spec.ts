/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavormingComponent } from './navorming.component';

describe('NavormingComponent', () => {
  let component: NavormingComponent;
  let fixture: ComponentFixture<NavormingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavormingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavormingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
