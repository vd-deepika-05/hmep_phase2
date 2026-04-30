import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ProjectInfo {
  projectCode: string;
  projectName: string;
  workOrder: string;
  projectOwner: string;
  empId: string;
  projectStatus: string;
}

interface BillingReadinessData {
  executionStatus: string;
  qcStatus: string;
  ncrStatus: string;
  finalCheckStatus: string;
}

interface ValidationStatus {
  executionCompleted: boolean;
  qcApproved: boolean;
  ncrClosed: boolean;
  finalChecksCompleted: boolean;
}

@Component({
  selector: 'app-billing-readiness',
  standalone: false,
  templateUrl: './billing-readiness.component.html',
  styleUrl: './billing-readiness.component.css'
})
export class BillingReadinessComponent implements OnInit {

  // Project Information
  projectInfo: ProjectInfo = {
    projectCode: 'PRJ-25041',
    projectName: 'Cable Bracket Assembly',
    workOrder: '41',
    projectOwner: 'Suman Reddy',
    empId: 'EMP104',
    projectStatus: 'In Process'
  };

  // Billing Readiness Status Data
  billingReadinessData: BillingReadinessData = {
    executionStatus: 'Completed',
    qcStatus: 'Approved',
    ncrStatus: 'Resolved',
    finalCheckStatus: 'Done'
  };

  // Validation Checklist Status
  validationStatus: ValidationStatus = {
    executionCompleted: true,
    qcApproved: true,
    ncrClosed: true,
    finalChecksCompleted: true
  };

  // Overall billing readiness flag
  isReadyForBilling: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.validateBillingReadiness();
  }

  /**
   * Validate if project is ready for billing
   * Checks all required conditions
   */
  validateBillingReadiness(): void {
    this.isReadyForBilling =
      this.validationStatus.executionCompleted &&
      this.validationStatus.qcApproved &&
      this.validationStatus.ncrClosed &&
      this.validationStatus.finalChecksCompleted;
  }

  /**
   * Get CSS class for status value based on status text
   * Maps status to corresponding color class
   */
  getStatusClass(status: string): string {
    const statusLower = status.toLowerCase();
    const statusMap: { [key: string]: string } = {
      'completed': 'completed',
      'approved': 'approved',
      'resolved': 'resolved',
      'done': 'done',
      'pending': 'pending',
      'failed': 'failed'
    };
    return statusMap[statusLower] || statusLower;
  }

  /**
   * Get icon class for status based on status text
   * Returns appropriate PrimeNG icon
   */
  getStatusIcon(status: string): string {
    const statusLower = status.toLowerCase();
    const iconMap: { [key: string]: string } = {
      'completed': 'pi-check-circle',
      'approved': 'pi-check-circle',
      'resolved': 'pi-check-circle',
      'done': 'pi-check-circle',
      'pending': 'pi-exclamation-circle',
      'failed': 'pi-times-circle'
    };
    return iconMap[statusLower] || 'pi-info-circle';
  }

  /**
   * Navigate back to project details dashboard
   */
  goBack(): void {
    this.router.navigate(['/main-layout/project-details-dashboard']);
  }

  /**
   * Update project information dynamically
   */
  updateProjectInfo(data: Partial<ProjectInfo>): void {
    this.projectInfo = { ...this.projectInfo, ...data };
  }

  /**
   * Update billing readiness status dynamically
   */
  updateBillingReadinessData(data: Partial<BillingReadinessData>): void {
    this.billingReadinessData = { ...this.billingReadinessData, ...data };
    this.validateBillingReadiness();
  }

  /**
   * Update validation status dynamically
   */
  updateValidationStatus(data: Partial<ValidationStatus>): void {
    this.validationStatus = { ...this.validationStatus, ...data };
    this.validateBillingReadiness();
  }
}