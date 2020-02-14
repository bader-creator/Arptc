import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {RestapiService} from '../../services/restapi.service'
import { format } from 'url';
import * as moment from 'moment/moment.js';
import * as MomentDuration from "moment-duration-format/lib/moment-duration-format";
@Component({
  selector: 'app-demande-sortie',
  templateUrl: './demande-sortie.page.html',
  styleUrls: ['./demande-sortie.page.scss'],
})
export class DemandeSortiePage implements OnInit {
 //utilisateur courant
  currentUser
  //:::::::::::::::::donnees ::::::::::::::::::::::::://
  sortie={
    "dateSortie":new Date().toISOString(),
    "heureDebut":"08:00",
    "heureFin":"",
    "dureesortie":"1:00",
    "idPersonnel":null,
    "message":"",
    "etat":"En Cours",
    "duree":null
  }
  //:::::::::::::::::::::::::::::::::::::::::://
  constructor(private storage:Storage,private api:RestapiService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
      //::::::::::::::::::::::::id user ::::::::::::::::::::::::::::::::::::::::::// 

    this.storage.get('currentuser').then((val)=>{
      this.currentUser=val;
      this.sortie.idPersonnel=val.id;
      console.log("currentuser",this.sortie.idPersonnel);
        //:::::::::::::::::::::::: ::::::::::::::::::::::::::::::::::::::::::// 

    })
  }


  //::::::::::::::::::::::::convert duree de sortie en minute ::::::::::::::::::::::::::::::::::::::::::// 
duree(dureesortie){
  switch(dureesortie) { 
    case "1:00": { 
       return 60;
    
    } 
    case "1:30": { 
      return 90;
      
    } 
    case "2:00": { 
      return 120;
   
   } 
   case "2:30": { 
    return 150;
  
   } 
    default: { 
       
       break; 
    } 
  } 
  
  }
   //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

 //::::::::::::::::::::::::ajouter duree de sortie a temps de  sortie :::::::::::::::::::::::::::::::::::::::::://
 dateRetour(){
    let duree=moment(this.sortie.heureDebut,'HH:mm').hours()*60+moment(this.sortie.heureDebut,'HH:mm').minute()+
    moment(this.sortie.dureesortie,'HH:mm').hours()*60+moment(this.sortie.dureesortie,'HH:mm').minute();
    console.log("duree",duree);

    let hours=(Math.trunc(duree/60));
    let mins=(duree%60);
    if(mins<10){
      this.sortie.heureFin=hours.toString()+':0'+mins.toString();
    }else {
      this.sortie.heureFin=hours.toString()+':'+mins.toString();
    }
    
    
    
    console.log("hours",hours)
    console.log("mins",mins)
    console.log("timeretour",this.sortie.heureFin)

  }
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://

 //::::::::::::::::::::::::autorisation de sorite :::::::::::::::::::::::::::::::::::::::::://

  DemandeDeSortie(){
    this.sortie.dateSortie=(new Date(this.sortie.dateSortie).getUTCFullYear()+"-"+(new Date(this.sortie.dateSortie).getMonth()+1)+"-"+new Date(this.sortie.dateSortie).getDate());
    this.sortie.message=this.currentUser.nom+" "+this.currentUser.prenom+" demande de sortie "+ this.sortie.dureesortie;
    console.log("dureesortie",this.sortie.dureesortie);
    this.dateRetour();
    this.sortie.duree=this.duree(this.sortie.dureesortie);
    console.log("duree",this.sortie.duree);
    this.api.AutorisationSortie(this.sortie);
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://



}
