import { Component, OnInit } from '@angular/core';
import {RestapiService} from '../../services/restapi.service';
import {environment} from '../../../environments/environment'
import {AuthentficationService} from '../../services/authentfication.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.page.html',
  styleUrls: ['./presence.page.scss'],
})
export class PresencePage implements OnInit {
  
  users;
  env=environment.pathavatar;
   
    listinfouser=[];

  constructor(private api:RestapiService,private auth:AuthentficationService) { }

  ngOnInit() {
    this.getPresence()
  }

  getPresence(){
    this.api.getPresence().then(data=>{
      this.users=JSON.parse(data.data);
      this.users.personnels.forEach(element => {
        this.listinfouser.push(element);
      });
      console.log("sdfsdqf",this.listinfouser)
    })
   
 

  }

}
