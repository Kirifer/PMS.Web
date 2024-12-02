import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent2 } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent2;
  let fixture: ComponentFixture<UsersComponent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComponent2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
