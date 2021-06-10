import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseServerComponent } from './choose-server.component';

describe('ChooseServerComponent', () => {
  let component: ChooseServerComponent;
  let fixture: ComponentFixture<ChooseServerComponent>;
  let httpMock: HttpTestingController;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseServerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ChooseServerComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
