import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, ToastController, NavController, MenuController } from '@ionic/angular';
import {environment} from '../../../environments/environment';
import { from } from 'rxjs';
import {AuthentficationService} from '../../services/authentfication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  segment="Home";
  dataUser
  env=environment.pathavatar;
  soldePersonnel
  roles=[]
  superieur
  constructor(public platform:Platform,public nav:NavController,private storage:Storage,private auth:AuthentficationService) {
    
 

   }

  ngOnInit() {
  
  }

  ionViewWillEnter(){

    this.storage.get('dataUser').then((val) => {
      console.log("val",val)
      this.dataUser=val;
      console.log("dataUser",this.dataUser)
      this.roles=val.roles;
      console.log('roles',this.roles);
      this.roles=Object.values(this.roles)
      console.log('rol',this.roles);
      this.roles.forEach(element => {
        if(element=="ROLE_GRH_ACCEPTER"){
          this.superieur=element;
        }
      });
      console.log("superieur",this.superieur);
    });
    this.storage.get('soldePersonnel').then((val)=>{
      this.soldePersonnel=val;
      console.log("soldePersonnel",this.soldePersonnel);
    })
  }
  logout(){
    this.auth.logout();
  }

}
