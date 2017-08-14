import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupPageComponent } from './singup-page.component';

describe('SingupPageComponent', () => {
  let component: SingupPageComponent;
  let fixture: ComponentFixture<SingupPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingupPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
