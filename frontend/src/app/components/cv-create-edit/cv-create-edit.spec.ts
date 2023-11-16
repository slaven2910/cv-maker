import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCreateEditComponent } from './cv-create-edit.component';

describe('CvCreateEditComponent', () => {
  let component: CvCreateEditComponent;
  let fixture: ComponentFixture<CvCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
