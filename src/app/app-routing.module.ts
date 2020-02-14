import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splach', pathMatch: 'full' },
  { path: 'login',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)},
  { path: 'splach',loadChildren: () => import('./pages/splach/splach.module').then( m => m.SplachPageModule)},
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./pages/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'demande',
    loadChildren: () => import('./pages/demande/demande.module').then( m => m.DemandePageModule)
  },
  {
    path: 'demande-conge',
    loadChildren: () => import('./pages/demande-conge/demande-conge.module').then( m => m.DemandeCongePageModule)
  },
  {
    path: 'demande-sortie',
    loadChildren: () => import('./pages/demande-sortie/demande-sortie.module').then( m => m.DemandeSortiePageModule)
  },
  {
    path: 'presence',
    loadChildren: () => import('./pages/presence/presence.module').then( m => m.PresencePageModule)
  },
  {
    path: 'action',
    loadChildren: () => import('./pages/action/action.module').then( m => m.ActionPageModule)
  },
  {
    path: 'valider-demande',
    loadChildren: () => import('./pages/valider-demande/valider-demande.module').then( m => m.ValiderDemandePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
