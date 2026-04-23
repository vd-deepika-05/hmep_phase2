import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { ProjectOwnerWorkbenchComponent } from './pages/project-owner-workbench/project-owner-workbench.component';
import { ProjectDetailsDashboardComponent } from './pages/project-details-dashboard/project-details-dashboard.component';

const routes: Routes = [

 
  // ✅ Redirect FIRST
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ✅ Login (public)
  { path: 'login', component: LoginComponent },

{ path: 'project-owner-workbench', component: ProjectOwnerWorkbenchComponent },
{ path: 'project-details-dashboard', component: ProjectDetailsDashboardComponent},
          { path: '', redirectTo: 'project-owner-workbench', pathMatch: 'full' }

  // ✅ Protected layout
  // {
  //   path: '',
  //   component: MainLayoutComponent,
  //   children: [

      // {
      //   path: 'admin',
      //   component: AdminComponent,
      //   children: [
      //     { path: 'users', component: UserManagementComponent },
      //     { path: 'roles', component: RolesComponent },
      //     { path: 'access-config', component: AccessConfigurationComponent },
      //     { path: '', redirectTo: 'users', pathMatch: 'full' }
      //   ]
      // },

     

   
  //   ]
  // },


  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}