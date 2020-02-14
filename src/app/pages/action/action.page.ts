import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastController,AlertController, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {
segment="Actions"
  constructor(public platform:Platform,public nav:NavController) {
 
  
  }
  ngOnInit() {
  }

}
