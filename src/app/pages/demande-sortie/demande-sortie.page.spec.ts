import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DemandeSortiePage } from './demande-sortie.page';

describe('DemandeSortiePage', () => {
  let component: DemandeSortiePage;
  let fixture: ComponentFixture<DemandeSortiePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeSortiePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DemandeSortiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
