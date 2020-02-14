import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValiderDemandePage } from './valider-demande.page';

describe('ValiderDemandePage', () => {
  let component: ValiderDemandePage;
  let fixture: ComponentFixture<ValiderDemandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderDemandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValiderDemandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
