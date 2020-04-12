import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNavBarComponent } from './register-nav-bar.component';

describe('RegisterNavBarComponent', () => {
  let component: RegisterNavBarComponent;
  let fixture: ComponentFixture<RegisterNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
