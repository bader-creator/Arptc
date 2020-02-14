import { Component,OnInit } from '@angular/core';
import {RestapiService} from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.page.html',
  styleUrls: ['./demande.page.scss'],
})
export class DemandePage implements OnInit {
    currentUser
    idPersonnel
    demandeConge
    deamndeSortie
    roles=[]
    segment="0"; 
    superieur;
   // @ViewChild('slides', { static:true })   slides: IonSlides;
    


  constructor(public api:RestapiService,public storage:Storage) { 

  }

  ngOnInit() {
  } 
  
//************************************get data of user**********************************//
ionViewWillEnter(){
  this.storage.get('dataUser').then((val) => {
    console.log("val",val)
    this.roles.push(val.roles);
    console.log('roles',this.roles);
  });

  this.storage.get('currentuser').then((val)=>{
    this.currentUser=val;
    this.idPersonnel=val.id;
    console.log("currentuser",this.idPersonnel);
    this.listDemandeConge(this.idPersonnel);
    this.listDemandeSortie(this.idPersonnel);
  })
}
//*******************************************************************/
/***************************************************ajoute d'uncongé*******************/

  listDemandeConge(id){
    this.api.getDemandeCongeByIdPersonnel(id).then(data=>{
      this.demandeConge= JSON.parse(data.data);
      console.log(  this.demandeConge)
    })
  }
/**************************************************/
  //********************************ajouter une autorisation de sortie************//
  listDemandeSortie(id){
    this.api.getDemandeSortieByIdPersonnel(id).then(data=>{
      this.deamndeSortie=JSON.parse(data.data);
      console.log(  this.deamndeSortie)
    })
  }
/**************************************************/



















}



