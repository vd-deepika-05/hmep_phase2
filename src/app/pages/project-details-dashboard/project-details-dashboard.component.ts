import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface PartCategory {
  name: string;
  total: number;
  completed: number;
  inProcess: number;
  surfaceFinish: number;
  hold: number;
}

interface ProjectDetails {
  projectCode: string;
  projectName: string;
  workOrder: string;
  projectOwner: string;
  employeeId: string;
  empId: string;
  projectStatus: string;
  date: string;
  partsData: {
    machiningParts: PartCategory;
    sheetmetalParts: PartCategory;
    castingParts: PartCategory;
    otherParts: PartCategory;
  };
}

interface ActionButton {
  label: string;
  action: string;
}

@Component({
  selector: 'app-project-details-dashboard',
  standalone: false,
  templateUrl: './project-details-dashboard.component.html',
  styleUrl: './project-details-dashboard.component.css'
})
export class ProjectDetailsDashboardComponent implements OnInit {

  projectDetails: ProjectDetails = {
    projectCode: 'PRJ-25041',
    projectName: 'Cable Bracket Assembly',
    workOrder: '41',
    projectOwner: 'Suman Reddy',
    employeeId: 'EMP104',
    empId: 'EMP104',
    projectStatus: 'In Process',
    date: '31-Jul-2025',
    partsData: {
      machiningParts: {
        name: 'Machining parts',
        total: 24,
        completed: 6,
        inProcess: 4,
        surfaceFinish: 12,
        hold: 2
      },
      sheetmetalParts: {
        name: 'Sheetmetal Parts',
        total: 42,
        completed: 10,
        inProcess: 8,
        surfaceFinish: 4,
        hold: 2
      },
      castingParts: {
        name: 'Casting Parts',
        total: 3,
        completed: 0,
        inProcess: 0,
        surfaceFinish: 3,
        hold: 0
      },
      otherParts: {
        name: 'Other Parts',
        total: 0,
        completed: 0,
        inProcess: 0,
        surfaceFinish: 0,
        hold: 0
      }
    }
  };

  isDelivered = false;
  
  actionButtons: ActionButton[] = [
    { label: 'WORK ON THIS PROJECT PARTS', action: 'workOnParts' },
    { label: 'REPORTS UPLOAD / LINKING', action: 'reportsUpload' },
    { label: 'STAGE-WISE PRODUCTION TRACKING', action: 'stageTracking' },
    { label: 'RAW STAGE ASSEMBLY CHECK', action: 'rawStageCheck' },
    { label: 'PAINT / ENGRAVING CHECK', action: 'paintCheck' },
    { label: 'CLEARED FOR BILLING', action: 'billingCheck' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkProjectStatus();
    this.loadProjectData();
  }

  checkProjectStatus() {
    // ✅ VALIDATION 1: Check if project is delivered
    this.isDelivered = this.projectDetails.projectStatus.toLowerCase() === 'delivered';
  }

  loadProjectData() {
    // In real implementation, this would fetch data from a service
    console.log('Project Details Loaded:', this.projectDetails);
  }

  handleAction(action: string) {
    switch(action) {
      case 'workOnParts':
        console.log('Navigating to work on parts');
        this.router.navigate(['/project-layout/project-list']);
        break;
      case 'reportsUpload':
        console.log('Opening reports upload modal');
        break;
      case 'stageTracking':
        console.log('Opening stage tracking');
        break;
      case 'rawStageCheck':
        console.log('Opening raw stage assembly check');
        break;
      case 'paintCheck':
        console.log('Opening paint/engraving check');
        break;
      case 'billingCheck':
        console.log('Opening billing check');
        // ✅ VALIDATION 2: Check execution completion before billing
        if (!this.canProceedToBilling()) {
          const incompletionDetails = this.getIncompletePartDetails();
          alert(`Project execution not complete.\n\n${incompletionDetails}\n\nPlease complete all parts and checks before billing.`);
          return;
        }
        console.log('Billing check - All validations passed');
        break;
    }
  }

  // ✅ VALIDATION 2: Billing readiness check - depends on execution completion
  canProceedToBilling(): boolean {
    const allPartsData = Object.values(this.projectDetails.partsData);
    
    // All parts must not have hold status
    // All parts must be either completed, in process, or surface finishing
    return allPartsData.every(category => {
      return (
        category.hold === 0 && 
        (category.completed + category.inProcess + category.surfaceFinish === category.total)
      );
    });
  }

  // Helper method to provide detailed completion status
  getIncompletePartDetails(): string {
    const allPartsData = Object.values(this.projectDetails.partsData);
    const incompleteCategories: string[] = [];

    allPartsData.forEach((category: PartCategory) => {
      if (category.total === 0) return; // Skip empty categories

      const hasHold = category.hold > 0;
      const isProcessed = (category.completed + category.inProcess + category.surfaceFinish === category.total);
      
      if (hasHold || !isProcessed) {
        if (hasHold) {
          incompleteCategories.push(`${category.name}: ${category.hold} parts on hold`);
        }
        if (!isProcessed) {
          const unprocessed = category.total - (category.completed + category.inProcess + category.surfaceFinish);
          incompleteCategories.push(`${category.name}: ${unprocessed} parts not processed`);
        }
      }
    });

    return incompleteCategories.length > 0 
      ? incompleteCategories.join('\n')
      : 'All parts are ready for billing';
  }

  getExecutionStatus(): string {
    const allPartsData = Object.values(this.projectDetails.partsData);
    const totalParts = allPartsData.reduce((sum, cat) => sum + cat.total, 0);
    const completedParts = allPartsData.reduce((sum, cat) => sum + cat.completed, 0);

    if (totalParts === 0) return 'No Parts';
    if (completedParts === totalParts) return 'Completed';
    if (completedParts === 0) return 'Not Started';
    return 'In Progress';
  }

  // Helper method to check if billing is ready
  isBillingReady(): boolean {
    return this.canProceedToBilling();
  }

  // Helper method to get billing status text
  getBillingStatusText(): string {
    if (this.isDelivered) {
      return 'Project is delivered';
    }
    if (this.canProceedToBilling()) {
      return 'Ready for billing';
    }
    return 'Execution incomplete - billing unavailable';
  }
}
