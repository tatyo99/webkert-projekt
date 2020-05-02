import { SearchComponent } from './search/search.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './_services/auth-guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'regist', component: RegistrationComponent},
  { path: 'search', component: SearchComponent},
  { path: '', component: LoginComponent},
  
  { path: '**', redirectTo: 'search', canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
