import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {AuthentficationService} from '../../services/authentfication.service';
import { Storage } from '@ionic/storage';
import { Camera} from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {RestapiService} from '../../services/restapi.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  dataUser
  soldePersonnel
  loading
  currentuser
  segment="Profile"
  env=environment.pathavatar;
  profil={
    "imageData":null,
    "TypeFile":null
  }
  constructor(public platform:Platform,private api:RestapiService,public loadingCtrl: LoadingController,public FilePath:FilePath,public FileChooser:FileChooser ,public Base64:Base64,public Camera:Camera,public nav:NavController,private auth:AuthentficationService,private AlertController:AlertController,private storage:Storage) {
    
  
   }

  ngOnInit() {
  }
  ionViewWillEnter(){
    if(this.auth.connected==false){
      this.api.presentToast('Impossible d’établir une connexion ');
    }
    else{
      this.storage.get('dataUser').then((val) => {
        console.log("val",val)
        this.dataUser=val;
        console.log("dataUser",this.dataUser);
      });
      this.storage.get('currentuser').then((val)=>{
        this.currentuser=val;
        console.log("currentuser",this.currentuser);
      })
      this.storage.get('soldePersonnel').then((val)=>{
        this.soldePersonnel=val;
        console.log("soldePersonnel",this.soldePersonnel);
      })
    }

  }

  logout(){
    this.auth.logout();
  }


  async ChangePicture() {
    const alert = await this.AlertController.create({
      header: 'Changer Photo de profil',
      buttons: [
        {
          text: 'Gallery',
          cssClass: 'secondary',
          handler: () => {
            this.chargerImageStorage();
          
          
          }
        }, {
          text: 'Camera',
          cssClass: 'secondary',
          handler: () => {
            this.chargerImageCamera();
          
          }
        }
      ]
    });
  
    await alert.present();
  }
  chargerImageCamera(){
    let options={quality: 100,correctOrientation: true};
    this.Camera.getPicture(options).then(imageData=>{
      this.Base64.encodeFile(imageData).then((base64File: string)=>{
        this.profil.TypeFile="jpeg";
        this.profil.imageData=base64File;


      }),(err) => {
        console.log(err);
      };
      

    })

  }
 
loadFile=false;
chargerImageStorage(){

this.FileChooser.open().then(uri => {


      // get file path
  this.FilePath.resolveNativePath(uri).then(file => {
  
    this.profil.TypeFile=file.split(".")[1];

    let filePath: string = file;
    if (filePath) {
              // convert your file in base64 format
      this.Base64.encodeFile(filePath).then((base64File: string) => {
  
                this.profil.imageData=base64File;
                

                
             
      }, (err) => {
        console.log('err'+JSON.stringify(err));
     
      });
    }
  }).catch(err => console.log(err));

 

}).catch(e => console.log('uri'+JSON.stringify(e)));






}

async loadingFn(){
this.loading = await  this.loadingCtrl.create({ message: "Connexion ..." });
this.loading.present();
}
async dismissFn(){
// console.log("dismiss");
 await this.loading.dismiss();
}

register(){
this.loadingFn()
this.dismissFn()

}
}