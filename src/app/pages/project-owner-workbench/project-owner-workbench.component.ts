import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

interface Project {
  projectOwner: string;
  empId: string;
  projectCode: string;
  projectName: string;
  workOrder: number;
  status: string;
}

@Component({
  selector: 'app-project-owner-workbench',
  standalone: false,
  templateUrl: './project-owner-workbench.component.html',
  styleUrls: ['./project-owner-workbench.component.css']
})
export class ProjectOwnerWorkbenchComponent implements OnInit {

  @ViewChild('dt') dt!: Table;

  loggedInUser = {
    empId: 'EMP104',
    name: 'Suman Reddy'
  };

  stats = {
    assigned: 0,
    open: 0,
    qcPending: 0,
    billingReady: 0
  };

  allProjects: Project[] = [];
  projects: Project[] = [];

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.allProjects = [
      {
        projectOwner: 'Suman Reddy',
        empId: 'EMP104',
        projectCode: 'PRJ-25041',
        projectName: 'Cable Bracket Assembly',
        workOrder: 41,
        status: 'In Progress'
      },
      {
        projectOwner: 'Suman Reddy',
        empId: 'EMP104',
        projectCode: 'PRJ-25042',
        projectName: 'Base Mount Batch',
        workOrder: 42,
        status: 'Hold'
      }
    ];

    this.projects = this.allProjects.filter(
      p => p.empId === this.loggedInUser.empId
    );

    this.calculateStats();
  }

  calculateStats() {
    this.stats.assigned = this.projects.length;
    this.stats.open = this.projects.filter(p => p.status === 'In Progress').length;
    this.stats.qcPending = this.projects.filter(p => p.status === 'QC Pending').length;
    this.stats.billingReady = this.projects.filter(p => p.status === 'Billing Ready').length;
  }

  // ✅ FIXED SEARCH
  onGlobalSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  openProject(row: Project) {
    console.log('Open:', row);
  }
}