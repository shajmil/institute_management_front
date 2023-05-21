import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

import { LoginComponent } from './admin/login/login.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { RegistrationComponent } from './admin/registration/registration.component';
import { AuthGuardAdminGuard } from './auth/auth-guard-admin.guard';
import { AuthGuardStudentGuard } from './auth/auth-guard-student.guard';
import { AuthGuardTeacherGuard } from './auth/auth-guard-teacher.guard';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashComponent } from './students/dash/dash.component';
import { StudentloginComponent } from './students/studentlogin/studentlogin.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'students',
    component: StudentloginComponent,


  },
  {
    path: '',
    pathMatch: 'full',
    component:LandingComponent ,
  },

  // {
  //   path: 'studentdash',
  //   component: DashComponent,
  // },

  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/teachers.module').then((m) => m.TeachersModule),
    canActivate: [AuthGuardTeacherGuard],
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
    canActivate: [AuthGuardStudentGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardAdminGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },

  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
