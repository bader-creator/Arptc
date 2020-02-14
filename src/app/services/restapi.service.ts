import { Injectable } from '@angular/core';

import { Dialogs } from '@ionic-native/dialogs/ngx';
import {AuthentficationService} from './authentfication.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { ToastController ,NavController,LoadingController,AlertController} from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})

export class RestapiService {

   constructor(private http:HTTP,private httpClient:HttpClient,private nav:NavController,private dialogs: Dialogs,public auth:AuthentficationService,public toastController: ToastController,public alertController: AlertController) { 
 
  }




  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color:"danger",
      showCloseButton:true,
      closeButtonText:"close"
    
    });
    toast.present();
  }
  
  async presentAlertConfirm(header:string,msg:string) {
    const alert = await this.alertController.create({
      header: header,
      message:msg,
      buttons: [
        {
          text:'OK',
          cssClass:'secondary'
        }
    ]

    });

    await alert.present();
  }
  
  AjouterConge(demande){
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    let httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Authorization': 'Bearer ' + this.auth.getToken(),
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  
    'Access-Control-Allow-Origin': '*',
    
    'Access-Control-Allow-Headers': 'Content-Type'})}
    let params = new URLSearchParams();
  
    for(let key in demande){
        params.set(key, demande[key]) 
    }
   
    return this.httpClient.post(`${environment.url}/addDemandeConge`, params.toString(), httpOptions).subscribe(data=>{
      this.auth.presentToast('Demande en cours de Validation.',"primary");
      this.nav.navigateRoot(`/demande`);
    })
  }}

  AutorisationSortie(demande){
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    return this.http.post(`${environment.url}/addDemandeSortie`, demande, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()}).then(data=>{
      this.auth.presentToast('Demande en cours de Validation.',"primary");
      this.nav.navigateRoot(`/demande`);
    });

  }}
  public getDemandeSortieByIdPersonnel(id:number) {
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    return   this.http.get(`${environment.url}/listDemandeSortie/${id}`, {}, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()});
  }}
  
  public getDemandeCongeByIdPersonnel(id:number){
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
      return   this.http.get(`${environment.url}/listDemandeConge/${id}`, {}, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()});

    }
  }
  public getPresence(){
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    return   this.http.get(`${environment.url}/presence`, {}, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()});
  }}

  public listDemandeCongeEnCoursParSuperieur(id:number) {
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    return   this.http.get(`${environment.url}/listDemandeCongeEnCoursParSuperieur/${id}`, {}, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()});
  }}
  
  
  public listDemandeSortieEnCoursParSuperieur(id:number){
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    return   this.http.get(`${environment.url}/listDemandeSortieEnCoursParSuperieur/${id}`, {}, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()});
  }}
  
  public validationDemandeConge(demande){
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    return   this.http.post(`${environment.url}/validationDemandeConge`,demande, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()});
  }}
  public validationDemandeSortie(demande){
    if(this.auth.connected==false){
      this.presentToast('Impossible d’établir une connexion ');
    }else{
    return   this.http.post(`${environment.url}/validationDemandeSortie`,demande, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.auth.getToken()});
  }}
  
  
}

