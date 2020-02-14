import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SplachPage } from './splach.page';

describe('SplachPage', () => {
  let component: SplachPage;
  let fixture: ComponentFixture<SplachPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplachPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SplachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
