import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailedComponent } from './user-detailed.component';

describe('UserDetailedComponent', () => {
  let component: UserDetailedComponent;
  let fixture: ComponentFixture<UserDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
