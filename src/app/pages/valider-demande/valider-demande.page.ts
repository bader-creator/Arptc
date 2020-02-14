import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
import {environment} from '../../../environments/environment'
import {AuthentficationService} from '../../services/authentfication.service';

@Component({
  selector: 'app-valider-demande',
  templateUrl: './valider-demande.page.html',
  styleUrls: ['./valider-demande.page.scss'],
})
export class ValiderDemandePage implements OnInit {
  demandeConge
  dataUser
  idPersonnel
  currentUser
  demandeSortie
  env=environment.pathavatar;

  constructor(private api:RestapiService,private storage:Storage,private auth:AuthentficationService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('dataUser').then((val) => {
      console.log("val",val)
      this.dataUser=val;
      console.log('datauser',this.dataUser)
    });
  
    this.storage.get('currentuser').then((val)=>{
      this.currentUser=val;
      this.idPersonnel=val.id;
      console.log("currentuser",this.idPersonnel);
      this.listDemandeCongeEnCoursParSuperieur(this.idPersonnel);
      this.listDemandeSortieEnCoursParSuperieur(this.idPersonnel);
    })
  }

  isenabled: boolean = false;
  idenabled;
  changeState(id) {
    this.idenabled=id;
    this.isenabled =!this.isenabled;
      console.log("isenable",this.isenabled)
      console.log('id',this.idenabled)
   }

   listDemandeCongeEnCoursParSuperieur(id){
     this.api.listDemandeCongeEnCoursParSuperieur(id).then(data=>{
       this.demandeConge=JSON.parse(data.data);
       console.log("demandeConge",this.demandeConge)
     })
   }
   listDemandeSortieEnCoursParSuperieur(id){
     this.api.listDemandeSortieEnCoursParSuperieur(id).then(data=>{
       this.demandeSortie=JSON.parse(data.data)
       console.log("demandeSortie",this.demandeSortie)
     })
   }


  validationDemandeConge(id){
     let validationConge={id:id,etat:"Validée"}
    this.api.validationDemandeConge(validationConge).then(d=>{
      this.auth.presentToast('Demande Validée.',"success");
      this.listDemandeCongeEnCoursParSuperieur(this.idPersonnel)

    })
   }
  validationDemandeSortie(id){
    let validationSortie={id:id,etat:"Validée"}
   this.api.validationDemandeSortie(validationSortie).then(d=>{
    this.auth.presentToast('Demande Validée.',"success");
    this.listDemandeSortieEnCoursParSuperieur(this.idPersonnel);

   })
  }
  RefuserDemandeSortie(id){
    let RefuserSortie={id:id,etat:"Refusée"}
    this.api.validationDemandeSortie(RefuserSortie).then(d=>{
      this.auth.presentToast('Demande Refusée.',"success");
      this.listDemandeSortieEnCoursParSuperieur(this.idPersonnel);
    })
  }
  RefuserDemandeConge(id){
    let RefuserConge={id:id,etat:"Refusée"}
    this.api.validationDemandeConge(RefuserConge).then(d=>{
      this.auth.presentToast('Demande Refusée.',"success");
      this.listDemandeCongeEnCoursParSuperieur(this.idPersonnel);

    })
  }
}
