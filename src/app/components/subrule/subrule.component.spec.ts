import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubruleComponent } from './subrule.component';

describe('SubruleComponent', () => {
  let component: SubruleComponent;
  let fixture: ComponentFixture<SubruleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubruleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
