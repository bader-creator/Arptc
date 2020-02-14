import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController ,NavController,LoadingController,AlertController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthentficationService {
  token;
  idUser;
  currentuser;
  superieur;
  soldePersonnel;
  dataUser;
  connected; 
  user
  constructor(private httpclient:HttpClient,private helper:JwtHelperService,private network: Network,public alertController: AlertController,private storage:Storage,private http:HTTP,public loadingController: LoadingController,private toastController:ToastController,private navctrl:NavController) { }
  
  
  async presentToast(msg:string,color:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      color:color,
      showCloseButton:true,
      closeButtonText:"close"
    
    });
    toast.present();
  }

  loading;
  async loadingFn(){
  this.loading = await  this.loadingController.create({ message: "Connexion ..." });
  this.loading.present();
}
async dismissFn(){
  // console.log("dismiss");
   await this.loading.dismiss();
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

 connect(){
  let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    this.presentToast('Impossible d’établir une connexion ',"danger");
    this.connected=false;
    console.log("connected",this.connected)
  });
 
  let connectSubscription = this.network.onConnect().subscribe(() => {
      this.connected=true; 
      console.log("connected",this.connected)
    this.presentAlertConfirm('Info','vous êtes connecté sur '+''+this.network.type +''+'Connection,Woohoo!')
    setTimeout(() => {
      this.alertController
    }, 3000);
  });
}

  checkToken(){
    this.storage.get('token').then((val)=>{
      console.log('Your token is', val);
      let decoded=this.helper.decodeToken(val);
      let isExpired=this.helper.isTokenExpired(val);
      console.log("decode",decoded);
      if (!isExpired) {
        this.user = decoded;
        this.token=val;
        this.navctrl.navigateForward(`/dashboard`);  
      
      } else {
        this.storage.remove('token');
        this.navctrl.navigateForward(`/login`);
      }
    })
  }


  
  login(params){
    if(this.connected==false){
      this.presentToast('Impossible d’établir une connexion ',"danger");
    }
    else{
      this.loadingFn();
      this.http.post(`${environment.url}/login_check`,params, {'Content-Type': 'application/json'}).then(data=>{
        //convert to json
        let resultat=JSON.parse(data.data);
        ///dismiss of loading
        this.dismissFn();
        //get data of user////////////////
        console.log("data",resultat);
        this.token=resultat.token;
        console.log("this.token",this.token)
        this.idUser=resultat.soldePersonnel.personnel.id;
        console.log("this.idUser",this.idUser)
        this.currentuser=resultat.soldePersonnel.personnel;
        console.log("this.currentuser",this.currentuser)
        this.superieur=resultat.soldePersonnel.personnel.superieur;
        console.log("this.superierur",this.superieur)
        this.soldePersonnel=resultat.soldePersonnel;
        console.log("this.soldePersonnel",this.soldePersonnel)
        this.dataUser=resultat.data;
        ////////::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://////
  //storage data of user
        this.storage.set('token',  this.token);
        this.storage.set('idUser',this.idUser);
        this.storage.set('currentuser',this.currentuser);
        this.storage.set('superieur',this.superieur);
        this.storage.set('soldePersonnel',this.soldePersonnel);
        this.storage.set('dataUser',this.dataUser);
  ////////::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::://////
        this.presentToast('Bienvenu Chez COSAP',"success");
        this.navctrl.navigateRoot(`/dashboard`);
        
      }).catch(error => {
        console.log(error);
        this.presentToast('le nom d\'utilisateur ou mot de passe est incorrect',"danger");
        this.dismissFn();
      });
    }
  }
  logout(){
    if(this.connected==false){
      this.presentToast('Impossible d’établir une connexion ',"danger");
    }
    else{
      this.token="";
      this.storage.remove('token');
      console.log("token",this.token);
      this.storage.remove('idUser');
      console.log('idUser',this.idUser)
      this.storage.remove('currentuser');
      this.storage.remove('superieur');
      this.storage.remove('soldePersonnel');
      this.storage.remove('dataUser');
      this.navctrl.navigateRoot(`/login`);
    }
  

  }
  
  public getToken(){
    return this.token;
  }

  
}
