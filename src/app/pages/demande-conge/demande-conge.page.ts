import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../services/restapi.service'
import { Storage } from '@ionic/storage';
import {AuthentficationService} from '../../services/authentfication.service'
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.page.html',
  styleUrls: ['./demande-conge.page.scss'],
})
export class DemandeCongePage implements OnInit {
  currentUser
  dataUser
  conge={
    "typeConge":"1",
     "dateDebutConge":new Date().toISOString(),
     "timedebut":"08:00",
     "dateFinConge":new Date().toISOString(),
     "timefin":"18:00",
     "dateReprise":new Date().toISOString(),
     "etat":"En Cours",
     "idPersonnel":null,
     "nbJours":null,
     "message":""
  }
  constructor(public api:RestapiService,private storage:Storage,private auth:AuthentficationService) { 

  }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.storage.get('dataUser').then((val) => {
      this.dataUser=val;
      console.log("dataUser",this.dataUser);
    });
    this.storage.get('currentuser').then((val)=>{
      this.currentUser=val;
      this.conge.idPersonnel=val.id;
      console.log("currentuser",this.conge.idPersonnel);
    })

  }
  DemandeConge(){
    var dateD = moment(new Date(this.conge.dateDebutConge).setHours(Number(this.conge.timedebut.split(":")[0]),Number(this.conge.timedebut.split(":")[1]), 0, 0));
    var dateF = moment(new Date(this.conge.dateFinConge).setHours(Number(this.conge.timefin.split(":")[0]),Number(this.conge.timefin.split(":")[1]), 0, 0));
    this.conge.dateDebutConge=(new Date(this.conge.dateDebutConge).getUTCFullYear()+"-"+(new Date(this.conge.dateDebutConge).getMonth()+1)+"-"+new Date(this.conge.dateDebutConge).getDate()+" "+this.conge.timedebut).toString();
    this.conge.dateFinConge=(new Date(this.conge.dateFinConge).getUTCFullYear()+"-"+(new Date(this.conge.dateFinConge).getMonth()+1)+"-"+new Date(this.conge.dateFinConge).getDate()+" "+this.conge.timefin).toString();
    this.conge.dateReprise=(new Date(this.conge.dateReprise).getUTCFullYear()+"-"+(new Date(this.conge.dateReprise).getMonth()+1)+"-"+new Date(this.conge.dateReprise).getDate()+" "+"08:00").toString();
    //this.conge.nbJours =( new Date(this.conge.datefin).getTime() - new Date(this.conge.datedebut).getTime());
    this.conge.nbJours = Number(dateF.diff(dateD, 'days'))+1;
    this.conge.message=this.currentUser.nom+" "+this.currentUser.prenom+" demande un congé de "+ this.conge.dateDebutConge+" jusqu'à "+this.conge.dateFinConge;

 
    if(this.conge.dateFinConge > this.conge.dateDebutConge && this.conge.dateReprise > this.conge.dateFinConge){
      this.api.AjouterConge(this.conge);
    }else{
      this.auth.presentToast('Date invalide',"danger");
    }
  }

}
