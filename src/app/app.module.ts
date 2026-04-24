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
import { DetailBomComponent } from './pages/detail-bom/detail-bom.component';
import { ReportsUploadComponent } from './pages/reports-upload/reports-upload.component';
import { StagewiseProductionComponent } from './pages/stagewise-production/stagewise-production.component';
import { InspectionReportComponent } from './pages/inspection-report/inspection-report.component';
import { QcDecisionComponent } from './pages/qc-decision/qc-decision.component';
import { NonConformanceReportComponent } from './pages/non-conformance-report/non-conformance-report.component';
import { FinalChecksComponent } from './pages/final-checks/final-checks.component';
import { BillingReadinessComponent } from './pages/billing-readiness/billing-readiness.component';
import { RawStageCheckComponent } from './pages/raw-stage-check/raw-stage-check.component';
import { PaintCheckComponent } from './pages/paint-check/paint-check.component';

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
               DetailBomComponent,
               ReportsUploadComponent,
               StagewiseProductionComponent,
               InspectionReportComponent,
               QcDecisionComponent,
               NonConformanceReportComponent,
               FinalChecksComponent,
               BillingReadinessComponent,
               RawStageCheckComponent,
               PaintCheckComponent,
      
        
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