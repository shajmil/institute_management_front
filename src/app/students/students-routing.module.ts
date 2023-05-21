import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  
  { path: '', component: StudentloginComponent },
  { path: 'studentdash', component: DashComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
