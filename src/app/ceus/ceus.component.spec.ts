import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeusComponent } from './ceus.component';

describe('CeusComponent', () => {
  let component: CeusComponent;
  let fixture: ComponentFixture<CeusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
