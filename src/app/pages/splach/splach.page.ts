import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splach',
  templateUrl: './splach.page.html',
  styleUrls: ['./splach.page.scss'],
})
export class SplachPage implements OnInit {

  constructor(public platform:Platform,public nav:NavController) {


   }

  ngOnInit() {
  }
}
