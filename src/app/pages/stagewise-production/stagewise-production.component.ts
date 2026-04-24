import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

interface Stage {
  stageName: string;
  stageNumber: number;
}

interface PartExecution {
  stage: string;
  sheetmetalDescription: string;
  sheetmetalCount: number;
  machinedDescription: string;
  machinedCount: number;
}

interface ProjectHeader {
  projectCode: string;
  projectName: string;
  workOrder: string;
  owner: string;
  employeeId: string;
  projectStatus: string;
}

@Component({
  selector: 'app-stagewise-production',
  standalone: false,
  templateUrl: './stagewise-production.component.html',
  styleUrl: './stagewise-production.component.css'
})
export class StagewiseProductionComponent implements OnInit {
  @ViewChild('dt') dt!: Table;

  projectHeader: ProjectHeader = {
    projectCode: 'PRJ-25041',
    projectName: 'Cable Bracket Assembly',
    workOrder: '41',
    owner: 'Suman Reddy',
    employeeId: 'EMP104',
    projectStatus: 'In Process'
  };

  stages: Stage[] = [
    { stageName: 'Stage 0', stageNumber: 0 },
    { stageName: 'Stage 1', stageNumber: 1 },
    { stageName: 'Stage 2', stageNumber: 2 },
    { stageName: 'Stage 3', stageNumber: 3 },
    { stageName: 'Stage 4', stageNumber: 4 }
  ];

  stagwiseExecutionData: PartExecution[] = [
    {
      stage: 'Stage 0',
      sheetmetalDescription: 'No Update',
      sheetmetalCount: 2,
      machinedDescription: 'No Update',
      machinedCount: 0
    },
    {
      stage: 'Stage 1',
      sheetmetalDescription: 'PRE BENDING OPERATION',
      sheetmetalCount: 18,
      machinedDescription: 'PRE MACHINING OPERATION',
      machinedCount: 16
    },
    {
      stage: 'Stage 2',
      sheetmetalDescription: 'BENDING',
      sheetmetalCount: 2,
      machinedDescription: 'MACHINING',
      machinedCount: 2
    },
    {
      stage: 'Stage 3',
      sheetmetalDescription: 'FASTNER INSERTION',
      sheetmetalCount: 12,
      machinedDescription: 'DEBURRING & FASTNER INSERTION',
      machinedCount: 2
    },
    {
      stage: 'Stage 4',
      sheetmetalDescription: 'READY IN RAW STAGE',
      sheetmetalCount: 8,
      machinedDescription: 'READY IN RAW STAGE',
      machinedCount: 4
    },
    {
      stage: 'Stage 4',
      sheetmetalDescription: 'READY IN RAW STAGE',
      sheetmetalCount: 8,
      machinedDescription: 'READY IN RAW STAGE',
      machinedCount: 4
    },
    {
      stage: 'Stage 4',
      sheetmetalDescription: 'READY IN RAW STAGE',
      sheetmetalCount: 8,
      machinedDescription: 'READY IN RAW STAGE',
      machinedCount: 4
    }
  ];

  displayedColumns: string[] = [
    'stage',
    'sheetmetalParts',
    'sheetmetalCount',
    'machinedParts',
    'machinedCount'
  ];

  constructor() {}

  ngOnInit(): void {
    this.validateExecutionData();
  }

  /**
   * Global search functionality for p-table
   */
  onGlobalSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  /**
   * Validates that counts reflect latest execution status
   */
  validateExecutionData(): void {
    this.stagwiseExecutionData.forEach((execution: PartExecution) => {
      // Validate sheetmetal count
      if (execution.sheetmetalCount < 0) {
        console.warn(
          `Invalid sheetmetal count for ${execution.stage}: ${execution.sheetmetalCount}`
        );
      }
      // Validate machined count
      if (execution.machinedCount < 0) {
        console.warn(
          `Invalid machined count for ${execution.stage}: ${execution.machinedCount}`
        );
      }
    });
  }

  /**
   * Navigation back to previous page
   */
  navigateBack(): void {
    window.history.back();
  }
}
