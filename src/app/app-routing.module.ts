import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { ProjectOwnerWorkbenchComponent } from './pages/project-owner-workbench/project-owner-workbench.component';
import { ProjectDetailsDashboardComponent } from './pages/project-details-dashboard/project-details-dashboard.component';
import { DetailBomComponent } from './pages/detail-bom/detail-bom.component';
import { FinalChecksComponent } from './pages/final-checks/final-checks.component';
import { NonConformanceReportComponent } from './pages/non-conformance-report/non-conformance-report.component';
import { QcDecisionComponent } from './pages/qc-decision/qc-decision.component';
import { ReportsUploadComponent } from './pages/reports-upload/reports-upload.component';
import { InspectionReportComponent } from './pages/inspection-report/inspection-report.component';
import { StagewiseProductionComponent } from './pages/stagewise-production/stagewise-production.component';
import { BillingReadinessComponent } from './pages/billing-readiness/billing-readiness.component';
import { RawStageCheckComponent } from './pages/raw-stage-check/raw-stage-check.component';
import { PaintCheckComponent } from './pages/paint-check/paint-check.component';
const routes: Routes = [

 
  // ✅ Redirect FIRST
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ✅ Login (public)
  { path: 'login', component: LoginComponent },

{ path: 'project-owner-workbench', component: ProjectOwnerWorkbenchComponent },
{ path: 'project-details-dashboard', component: ProjectDetailsDashboardComponent},
          { path: '', redirectTo: 'project-owner-workbench', pathMatch: 'full' },


  
  {
    path: 'main-layout',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'project-details-dashboard', pathMatch: 'full' },
      { path: 'project-details-dashboard', component: ProjectDetailsDashboardComponent },
      { path: 'project-owner-workbench', component: ProjectOwnerWorkbenchComponent },
      { path: 'detail-bom', component: DetailBomComponent },
      { path: 'final-checks', component: FinalChecksComponent },
      { path: 'billing-readiness', component: BillingReadinessComponent },
      { path: 'non-conformance-report', component: NonConformanceReportComponent },
      { path: 'qc-decision', component: QcDecisionComponent },
      { path: 'reports-upload', component: ReportsUploadComponent },
      { path: 'inspection-report', component: InspectionReportComponent },
      { path: 'stagewise-production', component: StagewiseProductionComponent },
      { path: 'raw-stage-check', component: RawStageCheckComponent },
      { path: 'paint-check', component: PaintCheckComponent },

    ]
  },

  



  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}