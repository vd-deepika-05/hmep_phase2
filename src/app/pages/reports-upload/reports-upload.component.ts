import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Table } from 'primeng/table';

export interface ReportItem {
  id: number;
  material: string;
  reportName: string;
  reportsCount: number;
  comments: string;
  isEditing?: boolean;
}

@Component({
  selector: 'app-reports-upload',
  standalone: false,
  templateUrl: './reports-upload.component.html',
  styleUrls: ['./reports-upload.component.css']
})
export class ReportsUploadComponent implements OnInit {
  @ViewChild('dt') table!: Table;

  reports: ReportItem[] = [];
  
  projectDetails = {
    code: 'PRJ-25041',
    name: 'Cable Bracket Assembly',
    workOrder: '41',
    owner: 'Suman Reddy',
    empId: 'EMP104',
    status: 'In Process'
  };
  
  materialsList: string[] = [
    '6MM Aluminium 5052 H32',
    '8MM Aluminium 5052 H32',
    '10MM Steel Plate',
    'Copper Wire 2.5mm'
  ];
  
  reportTypes: string[] = [
    'MTC',
    'Inward Inspection',
    'NABL',
    'Others'
  ];

  // Added dropdown options for Comments
  commentOptions: string[] = [
    'Uploaded',
    'Pending review',
    'Not linked'
  ];

  constructor(private location: Location) {}

  ngOnInit() {
    this.reports = [
      { id: 1, material: '6MM Aluminium 5052 H32', reportName: 'MTC', reportsCount: 1, comments: 'Uploaded', isEditing: false },
      { id: 2, material: '6MM Aluminium 5052 H32', reportName: 'Inward Inspection', reportsCount: 1, comments: 'Uploaded', isEditing: false },
      { id: 3, material: '6MM Aluminium 5052 H32', reportName: 'NABL', reportsCount: 2, comments: 'Pending review', isEditing: false },
      { id: 4, material: '6MM Aluminium 5052 H32', reportName: 'Others', reportsCount: 0, comments: 'Not linked', isEditing: false }
    ];
  }

  goBack() {
    this.location.back();
  }

  addNewRow() {
    const newId = this.reports.length > 0 ? Math.max(...this.reports.map(r => r.id)) + 1 : 1;
    const newRow: ReportItem = {
      id: newId,
      material: '',
      reportName: '',
      reportsCount: 0,
      comments: '', // Start empty for the user to select
      isEditing: true 
    };

    // Adds to start of array so it appears on the first page of pagination
    this.reports = [newRow, ...this.reports];
    
    // Force the table to jump to the first page (index 0)
    if (this.table) {
      this.table.first = 0;
    }
  }

  handleUpload(report: ReportItem) {
    if (!report.material || !report.reportName || !report.comments) {
      alert('Please fill in all fields before uploading.');
      return;
    }
    report.reportsCount += 1;
    report.isEditing = false; 
  }

  applyFilterGlobal($event: any) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
}