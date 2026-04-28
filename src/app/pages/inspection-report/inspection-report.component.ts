import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';

interface StageConfig {
  name: string;
  stageNum: number;
  completed: boolean;
  fields: string[];
}

@Component({
  selector: 'app-inspection-report',
  standalone: false,
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.css'],
})
export class InspectionReportComponent implements OnInit, OnDestroy {
  // ── Static display data ─────────────────────────────────────────
  today: string = '';
  currentTime: string = '';
  inspectionReportNo: string = '';
  private timeInterval: ReturnType<typeof setInterval> | undefined;
  private reportCounter = 1;

  // ── Stage config ────────────────────────────────────────────────
  stages: StageConfig[] = [
    { name: 'LASER CUTTING',              stageNum: 1, completed: false, fields: ['length', 'width', 'thickness', 'result'] },
    { name: 'CSK DRILLING',              stageNum: 1, completed: false, fields: ['holeDia', 'cskAngle', 'depth', 'result'] },
    { name: 'DEBURRING / BUFFING',       stageNum: 1, completed: false, fields: ['surfaceArea', 'burrPresent', 'finishQuality', 'result'] },
    { name: 'PRE BENDING FASTENER INSERTION', stageNum: 1, completed: false, fields: ['fastenerType', 'position', 'torque', 'result'] },
    { name: 'BENDING FLANGE DIMENSIONS', stageNum: 2, completed: false, fields: ['flangeNo', 'angle', 'height', 'result'] },
    { name: 'PART DIMENSIONS',           stageNum: 2, completed: false, fields: ['dimensionName', 'nominal', 'actual', 'result'] },
    { name: 'FASTENER INSERTION',        stageNum: 3, completed: false, fields: ['fastenerId', 'type', 'torque', 'result'] },
    { name: 'FASTENER POSITION',         stageNum: 3, completed: false, fields: ['fastenerId', 'xPos', 'yPos', 'result'] },
  ];

  activeStageIndex = 0;
  get currentStage(): StageConfig { return this.stages[this.activeStageIndex]; }

  // ── Form state ──────────────────────────────────────────────────
  stageForm!: FormGroup;
  submitted = false;
  submitting = false;

  // ── Toast state ─────────────────────────────────────────────────
  toastVisible = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(private fb: FormBuilder) {}

  // ── Lifecycle ───────────────────────────────────────────────────
  ngOnInit(): void {
    this.updateDateTime();
    this.timeInterval = setInterval(() => this.updateDateTime(), 1000);
    this.generateReportNo();
    this.buildForm();
  }

  ngOnDestroy(): void {
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }

  // ── Helpers ─────────────────────────────────────────────────────
  private updateDateTime(): void {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    this.today = `${dd}/${mm}/${yyyy}`;
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    this.currentTime = `${hh}:${min}:${ss}`;
  }

  private generateReportNo(): void {
    const pad = String(this.reportCounter).padStart(4, '0');
    this.inspectionReportNo = `INS-2024-${pad}`;
  }

  // ── Form Building ────────────────────────────────────────────────
  buildForm(): void {
    const fields = this.stages[this.activeStageIndex].fields;
    this.stageForm = this.fb.group({
      lotSize: [null, [Validators.required, Validators.min(1)]],
      rows: this.fb.array([this.createRow(fields)]),
    });
    this.submitted = false;
  }

  private createRow(fields: string[]): FormGroup {
    const group: { [key: string]: unknown } = {};
    fields.forEach((f) => {
      if (f === 'result') {
        group[f] = [null];
      } else {
        group[f] = [null, Validators.required];
      }
    });
    return this.fb.group(group);
  }

  get rowsArray(): FormArray {
    return this.stageForm.get('rows') as FormArray;
  }

  addRow(): void {
    const fields = this.stages[this.activeStageIndex].fields;
    this.rowsArray.push(this.createRow(fields));
  }

  removeRow(index: number): void {
    if (this.rowsArray.length > 1) {
      this.rowsArray.removeAt(index);
    }
  }

  // ── Validation helpers ───────────────────────────────────────────
  isFieldInvalid(fieldName: string): boolean {
    const ctrl = this.stageForm.get(fieldName);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted);
  }

  isRowFieldInvalid(rowIndex: number, fieldName: string): boolean {
    const row = this.rowsArray.at(rowIndex) as FormGroup;
    const ctrl = row.get(fieldName);
    return !!ctrl && ctrl.invalid && (ctrl.touched || this.submitted);
  }

  hasIncompleteRows(): boolean {
    return this.rowsArray.controls.some((row) => {
      const fg = row as FormGroup;
      return Object.keys(fg.controls).some((key) => {
        if (key === 'result') return false;
        return fg.controls[key].invalid;
      });
    });
  }

  get minChecked(): number {
    const lot = this.stageForm.get('lotSize')?.value;
    if (!lot || lot < 1) return 0;
    return Math.ceil(lot * 0.1);
  }

  get isLotValid(): boolean {
    const lot = this.stageForm.get('lotSize')?.value;
    if (!lot || lot < 1) return false;
    return this.rowsArray.length >= Math.ceil(lot * 0.1);
  }

  private markAllTouched(control: AbstractControl): void {
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach((c) => this.markAllTouched(c));
    } else if (control instanceof FormArray) {
      control.controls.forEach((c) => this.markAllTouched(c));
    } else {
      control.markAsTouched();
    }
  }

  // ── Submit ───────────────────────────────────────────────────────
  onSubmit(): void {
    this.submitted = true;
    this.markAllTouched(this.stageForm);

    if (this.stageForm.get('lotSize')?.invalid) {
      this.showToast('Please enter a valid lot size.', 'error');
      return;
    }

    if (!this.isLotValid) {
      this.showToast(
        `Minimum ${this.minChecked} parts must be checked (10% of lot).`,
        'error'
      );
      return;
    }

    if (this.hasIncompleteRows()) {
      this.showToast('Please complete all check row entries.', 'error');
      return;
    }

    this.submitting = true;

    // Simulate API call
    setTimeout(() => {
      this.submitting = false;
      this.stages[this.activeStageIndex].completed = true;
      this.reportCounter++;
      this.generateReportNo();
      this.showToast(
        `${this.currentStage.name} submitted successfully!`,
        'success'
      );
      // Auto-advance to next step after submit
      if (this.activeStageIndex < this.stages.length - 1) {
        setTimeout(() => this.nextStep(), 800);
      }
    }, 1200);
  }

  // ── Navigation ───────────────────────────────────────────────────
  navigateToStage(index: number): void {
    this.activeStageIndex = index;
    this.buildForm();
  }

  nextStep(): void {
    if (this.activeStageIndex < this.stages.length - 1) {
      this.activeStageIndex++;
      this.buildForm();
    }
  }

  goToQCDecision(): void {
    this.showToast('Navigating to QC Decision...', 'success');
    // In a real app: this.router.navigate(['/qc-decision'])
    window.location.href = '/main-layout/qc-decision';
  }

  // ── Toast ────────────────────────────────────────────────────────
  private showToast(message: string, type: 'success' | 'error'): void {
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3500);
  }
}