import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemandeCongePage } from './demande-conge.page';

describe('DemandeCongePage', () => {
  let component: DemandeCongePage;
  let fixture: ComponentFixture<DemandeCongePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeCongePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemandeCongePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
