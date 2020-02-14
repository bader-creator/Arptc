import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { AuthentficationService } from '../../services/authentfication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login={
    username:'',
    password:''
  }
  constructor(public platform:Platform,private alertCtrl:AlertController,public nav:NavController,private authentifie:AuthentficationService) {
   
  

   }
 
  ngOnInit() {
  }
  verifeChamp=false;
  checkin(){
    this.verifeChamp=true;
    if(this.login.username  && this.login.password ){
      this.verifeChamp=false;
    this.authentifie.login(this.login)
    }
  }
   passwordType: string = 'password';
   passwordIcon: string = 'eye-off';
 
  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
