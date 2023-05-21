import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentloginComponent } from '../students/studentlogin/studentlogin.component';
import { LoginComponent } from '../teachers/login/login.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "student",
  },
  { path: 'student', component: StudentloginComponent },
  { path: 'teacher', component: LoginComponent },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
