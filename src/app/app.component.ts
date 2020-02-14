import { Component } from '@angular/core';
import { ToastController,AlertController, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestapiService } from './../app/services/restapi.service';
import { AuthentficationService } from './../app/services/authentfication.service';
import { fromEvent } from 'rxjs';
import { Location } from '@angular/common';
import { Router, ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  subscription
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl:NavController,
    private api:RestapiService,
    private alertCtrl:AlertController,
    private location:Location,
    private menuCtrl:MenuController,
    private auth:AuthentficationService,
    private router:Router,
    private ActivatedRoute:ActivatedRoute
  ) {
    this.initializeApp();
    this.auth.connect();
    this.auth.checkToken();

     this.platform.backButton.subscribe(() => {
      /*if(this.router.parseUrl('login') ){
        this.presentAlertConfirm()     
        console.log("routtetetee")
       }*/
        //else{
        this.location.back()
      //}
    });
  }
  async presentAlertConfirm() {
   const alert = await this.alertCtrl.create({
     message:'Voulez vous quitter cette application?',
     buttons: [
       {
         text: 'No',
         role: 'cancel',
         cssClass:'secondary',
         handler: () => {
           // Dismiss
         }
       },
       {
         text: 'Exit',
         cssClass:'secondary',
         handler: () => {
           navigator["app"].exitApp();
         }
       }
     ]

   });

   await alert.present();
 }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
  
    });
    


  }



}
