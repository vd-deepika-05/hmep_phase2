import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatestWith } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(private router: Router) {}

  handleAddNew() {
    const url = this.router.url;

    switch (url) {
      case '/detail-bom':
        console.log('Go to detail BOM page');
        this.router.navigate(['/pages/detail-bom']);
        break;
      case '/billing-readiness':
        console.log('Go to billing readiness page');
        this.router.navigate(['/pages/billing-readiness']);
        break;
      case '/final-checks':
        console.log('Go to final checks page');
        this.router.navigate(['/pages/final-checks']);
        break;
      case '/project-owner-workbench':
        console.log('Go to project owner workbench page');
        this.router.navigate(['/pages/project-owner-workbench']);
        break;
      case '/project-details-dashboard':
        console.log('Go to project details dashboard page');
        this.router.navigate(['/pages/project-details-dashboard']);
        break;
      case '/stagewise-production':
        console.log('Go to stagewise production page');
        this.router.navigate(['/pages/stagewise-production']);
        break;
      case '/inspection-report':
        console.log('Go to inspection report page');
        this.router.navigate(['/pages/inspection-report']);
        break;
      case '/reports-upload':
        console.log('Go to reports upload page');
        this.router.navigate(['/pages/reports-upload']);
        break;
      case '/qc-decision':
        console.log('Go to QC decision page');
        this.router.navigate(['/pages/qc-decision']);
        break;
      case '/non-conformance-report':
        console.log('Go to non-conformance report page');
        this.router.navigate(['/pages/non-conformance-report']);
        break;

      default:
        console.log('No action defined');
    }
  }
}
