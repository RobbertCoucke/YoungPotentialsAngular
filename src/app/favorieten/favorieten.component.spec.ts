import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorietenComponent } from './favorieten.component';

describe('FavorietenComponent', () => {
  let component: FavorietenComponent;
  let fixture: ComponentFixture<FavorietenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavorietenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorietenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
