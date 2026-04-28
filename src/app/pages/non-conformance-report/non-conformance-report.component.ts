import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-non-conformance-report',
  standalone: false,
  templateUrl: './non-conformance-report.component.html',
  styleUrl: './non-conformance-report.component.css'
})
export class NonConformanceReportComponent implements OnInit {
  ncrForm!: FormGroup;
  capaForm!: FormGroup;
  showNcrErrors = false;
  showCapaErrors = false;

  projectHeader = {
    projectCode: 'PRJ-25041',
    projectName: 'Cable Bracket Assembly',
    workOrder: '41',
    owner: 'Suman Reddy',
    empId: 'EMP104',
    projectStatus: 'In Process',
    partNo: 'CB04718',
    partName: 'CABLE BRACKET TCU2',
    material: 'Stainless Steel 304',
    requiredFinish: 'Passivation'
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForms();
    this.populateSystemFields();
  }

  /**
   * Initialize NCR and CAPA Forms with Enhanced Validators
   */
  initializeForms(): void {
    // NCR Form
    this.ncrForm = this.fb.group({
      date: [{ value: '', disabled: true }],
      time: [{ value: '', disabled: true }],
      partNo: [{ value: '', disabled: true }],
      inspectionReportNo: [{ value: '', disabled: true }],
      problemDescription: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]]
    });

    // CAPA Form
    this.capaForm = this.fb.group({
      workOrderNo: [{ value: '', disabled: true }],
      inspectionReportNo: [{ value: '', disabled: true }],
      totalQtyProduced: [{ value: '', disabled: true }],
      rejectedQty: [{ value: '', disabled: true }],
      rootCauseAnalysis: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      actionTaken: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      verificationComments: ['', [Validators.maxLength(300)]]
    });
  }

  /**
   * Populate system-generated fields
   */
  populateSystemFields(): void {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const formattedTime = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    // Set NCR system fields
    this.ncrForm.patchValue({
      date: formattedDate,
      time: formattedTime,
      partNo: this.projectHeader.partNo,
      inspectionReportNo: 'IR-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });

    // Set CAPA system fields
    this.capaForm.patchValue({
      workOrderNo: this.projectHeader.workOrder,
      inspectionReportNo: 'IR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      totalQtyProduced: '10000',
      rejectedQty: '100'
    });
  }

  /**
   * Get error message for a form field
   */
  getErrorMessage(form: FormGroup, fieldName: string): string {
    const control = form.get(fieldName);
    if (!control || !control.errors) {
      return '';
    }

    const errors = control.errors;
    if (errors['required']) {
      return `${this.formatFieldName(fieldName)} is required.`;
    }
    if (errors['minLength']) {
      return `${this.formatFieldName(fieldName)} must be at least ${errors['minLength'].requiredLength} characters.`;
    }
    if (errors['maxLength']) {
      return `${this.formatFieldName(fieldName)} cannot exceed ${errors['maxLength'].requiredLength} characters.`;
    }
    if (errors['min']) {
      return `${this.formatFieldName(fieldName)} must be at least ${errors['min'].min}.`;
    }
    if (errors['pattern']) {
      return `${this.formatFieldName(fieldName)} must contain only numbers.`;
    }
    return 'Invalid input.';
  }

  /**
   * Format field name for display
   */
  formatFieldName(fieldName: string): string {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  }

  /**
   * Check if form field has error
   */
  hasError(form: FormGroup, fieldName: string): boolean {
    const control = form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  /**
   * Mark all fields as touched to show validation errors
   */
  markAllFieldsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Handle correction action button
   */
  onCorrectionAction(): void {
    this.showNcrErrors = true;
    this.markAllFieldsTouched(this.ncrForm);

    if (this.ncrForm.valid) {
      console.log('NCR Data:', this.ncrForm.getRawValue());
      alert('Correction action report generated. Proceed to CA/PA section.');
      this.showNcrErrors = false;
    } else {
      alert('Please fill all required NCR fields correctly.');
    }
  }

  /**
   * Handle submit button
   */
  onSubmit(): void {
    this.showCapaErrors = true;
    this.markAllFieldsTouched(this.capaForm);

    if (this.capaForm.valid) {
      const ncrData = this.ncrForm.getRawValue();
      const capaData = this.capaForm.getRawValue();

      const completeData = {
        ...ncrData,
        ...capaData,
        projectCode: this.projectHeader.projectCode,
        projectName: this.projectHeader.projectName,
        owner: this.projectHeader.owner,
        empId: this.projectHeader.empId
      };

      console.log('NCR/CAPA Complete Data:', completeData);
      alert('NCR/CAPA submitted successfully!');
      this.showCapaErrors = false;
    } else {
      alert('Please fill all required fields in CAPA section correctly.');
    }
  }

  /**
   * Handle apply for verification
   */
  onApplyVerification(): void {
    this.showCapaErrors = true;
    this.markAllFieldsTouched(this.capaForm);

    if (this.capaForm.valid) {
      console.log('Submitted for verification:', this.capaForm.getRawValue());
      alert('CAPA submitted for verification. Awaiting approval.');
      this.showCapaErrors = false;
    } else {
      alert('Please complete all required fields before submitting for verification.');
    }
  }

  /**
   * Handle verification approved
   */
  onVerificationApproved(): void {
    console.log('Verification approved for:', this.capaForm.getRawValue());
    alert('CAPA verification approved successfully!');
  }

  /**
   * Handle return to project
   */
  onReturnToProject(): void {
    console.log('Returning to project details...');
    this.router.navigate(['/main-layout/project-details-dashboard']);
  }

  /**
   * Handle Non-Conformance Report generation
   */
  onNonConformanceReport(): void {
    console.log('Generating Non-Conformance Report...');
    alert('Non-Conformance Report generated and ready for download.');
  }
}
