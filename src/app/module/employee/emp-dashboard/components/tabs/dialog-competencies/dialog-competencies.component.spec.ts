import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompetenciesComponent } from './dialog-competencies.component';

describe('DialogCompetenciesComponent', () => {
  let component: DialogCompetenciesComponent;
  let fixture: ComponentFixture<DialogCompetenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCompetenciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCompetenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
