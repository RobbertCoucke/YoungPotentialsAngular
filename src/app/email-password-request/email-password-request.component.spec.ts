import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPasswordRequestComponent } from './email-password-request.component';

describe('EmailPasswordRequestComponent', () => {
  let component: EmailPasswordRequestComponent;
  let fixture: ComponentFixture<EmailPasswordRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailPasswordRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPasswordRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
