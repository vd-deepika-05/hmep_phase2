import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // <-- IMPORT THIS
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";
import { HeaderComponent } from "./layout/header/header.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { AuthInterceptor } from '../app/interceptors/auth.interceptor';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG Modules
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';

import { TabViewModule } from 'primeng/tabview';

import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';

import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { LoginComponent } from './login/login.component';

import { ModuleLayoutComponent } from './layout/module-layout/module-layout.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ProjectOwnerWorkbenchComponent } from './pages/project-owner-workbench/project-owner-workbench.component';
import { ProjectDetailsDashboardComponent } from './pages/project-details-dashboard/project-details-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
  
 

  
   
 
         LoginComponent,
    
         ModuleLayoutComponent,
               ProjectOwnerWorkbenchComponent,
               ProjectDetailsDashboardComponent,
      
        
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    TabViewModule,
     CardModule,
    BadgeModule,
    CheckboxModule,
    TooltipModule,
    PaginatorModule,
    CalendarModule,
    InputSwitchModule,
    TagModule,
    ConfirmDialogModule ,
    FileUploadModule,
   
    HttpClientModule   // <-- ADD HERE
  ],
  providers: [ConfirmationService, MessageService,
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}