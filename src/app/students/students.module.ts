import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { DashComponent } from './dash/dash.component';


import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentloginComponent,
    DashComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,ReactiveFormsModule,FormsModule
  ]
})
export class StudentsModule { }
