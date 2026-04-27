import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export interface BomLine {
  id: number;
  partNo: string;
  partName: string;
  drawingNo: string;
  partType: string;
  qty: number;
  currentStage: string;
  status: string;
  remarks: string;
  image: string | null;
}
interface ProjectDetails {
  projectCode:string;
projectName:string;
workOrder:string;
projectOwner:string;
employeeId:string;
empId:string;
projectStatus:string;
}

export interface ImageLibraryItem {
  src: string;
  name: string;
}

@Component({
  selector: 'app-detail-bom',
  standalone:false,
  templateUrl: './detail-bom.component.html',
  styleUrls: ['./detail-bom.component.css'],
})
export class DetailBomComponent implements OnInit {

  /* ─── Project info (normally injected via route state / service) ─── */
projectDetails: ProjectDetails = {
  projectCode: 'PRJ-25341',
  projectName: 'Cable Bracket Assembly',
  workOrder: '41',
  projectOwner: 'Suman Reddy',
  empId: 'EMP104',
  employeeId: 'EMP104', // required
  projectStatus: 'In Process',
};

  /* ─── BOM data ───────────────────────────────────────────────────── */
  bomLines: BomLine[] = [
    { id: 1, partNo: 'K6064738', partName: 'CABLE BRACKET TL/2',  drawingNo: 'DWG-001', partType: 'Sheetmetal Parts', qty: 2, currentStage: 'Stage 1', status: 'In Process', remarks: '', image: null },
    { id: 2, partNo: 'PART002',  partName: 'Base Mount Plate',     drawingNo: 'DWG-002', partType: 'Machining Parts',  qty: 4, currentStage: 'Stage 2', status: 'In Process', remarks: '', image: null },
    
    { id: 3, partNo: 'PART003',  partName: 'Side Clamp',           drawingNo: 'DWG-003', partType: 'Sheetmetal Parts', qty: 6, currentStage: 'Stage 0', status: 'Pending',    remarks: '', image: null },
    { id: 3, partNo: 'PART003',  partName: 'Side Clamp',           drawingNo: 'DWG-003', partType: 'Sheetmetal Parts', qty: 6, currentStage: 'Stage 0', status: 'Pending',    remarks: '', image: null },
    { id: 3, partNo: 'PART003',  partName: 'Side Clamp',           drawingNo: 'DWG-003', partType: 'Sheetmetal Parts', qty: 6, currentStage: 'Stage 0', status: 'Pending',    remarks: '', image: null },{ id: 3, partNo: 'PART003',  partName: 'Side Clamp',           drawingNo: 'DWG-003', partType: 'Sheetmetal Parts', qty: 6, currentStage: 'Stage 0', status: 'Pending',    remarks: '', image: null },

    { id: 3, partNo: 'PART003',  partName: 'Side Clamp',           drawingNo: 'DWG-003', partType: 'Sheetmetal Parts', qty: 6, currentStage: 'Stage 0', status: 'Pending',    remarks: '', image: null },
    { id: 3, partNo: 'PART003',  partName: 'Side Clamp',           drawingNo: 'DWG-003', partType: 'Sheetmetal Parts', qty: 6, currentStage: 'Stage 0', status: 'Pending',    remarks: '', image: null },
    { id: 3, partNo: 'PART003',  partName: 'Side Clamp',           drawingNo: 'DWG-003', partType: 'Sheetmetal Parts', qty: 6, currentStage: 'Stage 0', status: 'Pending',    remarks: '', image: null },
    
  ];
  private nextId = 4;

  /* ─── Lookup lists ───────────────────────────────────────────────── */
  partTypes: string[] = [
    'Sheetmetal Parts',
    'Machining Parts',
    'Fabricated Parts',
    'Purchased Parts',
    'Assembly Parts',
  ];

  stages: string[] = ['Stage 0', 'Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Final'];

  /* ─── Global image library (persists across link-image sessions) ─── */
  imageLibrary: ImageLibraryItem[] = [];

  /* ══════════════════════════════════════════════════════════════════
     DIALOG 1 — UPDATE PARTS
  ══════════════════════════════════════════════════════════════════ */
  showUpdateDialog = false;
  selectedPart: BomLine | null = null;
  private originalPartId: number | null = null;

  openUpdateDialog(row: BomLine): void {
    // Deep-clone so cancel does not mutate the row in place
    this.selectedPart = { ...row };
    this.originalPartId = row.id;
    this.showUpdateDialog = true;
  }

  saveUpdate(): void {
    if (!this.selectedPart) return;

    const { partNo, partName, drawingNo, partType, qty } = this.selectedPart;

    if (!partNo?.trim() || !partName?.trim() || !drawingNo?.trim() || !partType || !qty) {
      this.toast('Please fill in all mandatory fields.', 'warn');
      return;
    }

    // Duplicate Part No check (exclude the row being edited)
    const duplicate = this.bomLines.find(
      b => b.partNo.toLowerCase() === partNo.trim().toLowerCase() && b.id !== this.originalPartId
    );
    if (duplicate) {
      this.toast(`Part No "${partNo}" already exists on another row.`, 'warn');
      return;
    }

    const idx = this.bomLines.findIndex(b => b.id === this.originalPartId);
    if (idx !== -1) {
      this.bomLines[idx] = { ...this.selectedPart, id: this.originalPartId! };
      this.bomLines = [...this.bomLines]; // trigger PrimeNG change detection
    }

    this.showUpdateDialog = false;
    this.toast(`${partNo} updated successfully.`);
  }

  /* ══════════════════════════════════════════════════════════════════
     DIALOG 2 — ADD NEW LINE ITEM
  ══════════════════════════════════════════════════════════════════ */
  showAddDialog = false;
  addSubmitted = false;

  newLine: Partial<BomLine> = this.emptyNewLine();

  private emptyNewLine(): Partial<BomLine> {
    return {
      partNo: '',
      partName: '',
      drawingNo: '',
      partType: '',
      qty: undefined,
      currentStage: 'Stage 0',
      remarks: '',
    };
  }

  openAddDialog(): void {
    this.addSubmitted = false;
    this.newLine = this.emptyNewLine();
    this.showAddDialog = true;
  }

  resetNewLine(): void {
    this.addSubmitted = false;
    this.newLine = this.emptyNewLine();
  }

  saveNewLine(): void {
    this.addSubmitted = true;
    const { partNo, partName, drawingNo, partType, qty } = this.newLine;

    if (!partNo?.trim() || !partName?.trim() || !drawingNo?.trim() || !partType || !qty) {
      return; // inline error messages shown via addSubmitted flag
    }

    const duplicate = this.bomLines.find(
      b => b.partNo.toLowerCase() === partNo.trim().toLowerCase()
    );
    if (duplicate) {
      this.toast(`Part No "${partNo}" already exists.`, 'warn');
      return;
    }

    const newRow: BomLine = {
      id: this.nextId++,
      partNo: partNo.trim(),
      partName: partName.trim(),
      drawingNo: drawingNo.trim(),
      partType,
      qty: Number(qty),
      currentStage: this.newLine.currentStage || 'Stage 0',
      status: 'Pending',
      remarks: this.newLine.remarks || '',
      image: null,
    };

    this.bomLines = [...this.bomLines, newRow];
    this.showAddDialog = false;
    this.toast(`${newRow.partNo} — ${newRow.partName} added successfully.`);
  }

  /* ══════════════════════════════════════════════════════════════════
     DIALOG 3 — UPLOAD EXCEL FILE
  ══════════════════════════════════════════════════════════════════ */
  showUploadDialog = false;
  isDragOver = false;
  uploadedFileName = '';
  importPreviewRows: Partial<BomLine>[] = [];

  openUploadDialog(): void {
    this.resetUpload();
    this.showUploadDialog = true;
  }

  resetUpload(): void {
    this.uploadedFileName = '';
    this.importPreviewRows = [];
    this.isDragOver = false;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.processUploadFile(file);
  }

  onExcelFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.processUploadFile(file);
    input.value = ''; // reset so same file can be re-selected
  }

  private processUploadFile(file: File): void {
    this.uploadedFileName = file.name;
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'csv') {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        this.importPreviewRows = this.parseCSV(text);
      };
      reader.readAsText(file);
    } else if (ext === 'xlsx' || ext === 'xls') {
      // Real XLSX parsing requires SheetJS (xlsx npm package).
      // If SheetJS is available in the project, replace this block with actual parsing.
      // For now we simulate two parsed rows as a placeholder demonstration.
      this.importPreviewRows = this.simulateXlsxParse();
    } else {
      this.toast('Unsupported file type. Please upload .xlsx, .xls, or .csv.', 'warn');
      this.uploadedFileName = '';
    }
  }

  /**
   * Parses a CSV string.
   * Expected header row (case-insensitive): partno, partname, drawingno, parttype, qty
   * Column aliases are resolved so exports from different tools are handled.
   */
  private parseCSV(csv: string): Partial<BomLine>[] {
    const lines = csv.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());

    const colAlias: Record<string, string[]> = {
      partNo:       ['partno', 'part no', 'part_no', 'part number', 'partnumber'],
      partName:     ['partname', 'part name', 'part_name', 'description', 'name'],
      drawingNo:    ['drawingno', 'drawing no', 'drawing_no', 'dwg', 'drawing number'],
      partType:     ['parttype', 'part type', 'part_type', 'type', 'category'],
      qty:          ['qty', 'quantity', 'count', 'amount'],
    };

    const colIndex = (key: string): number => {
      for (const alias of colAlias[key]) {
        const idx = headers.indexOf(alias);
        if (idx !== -1) return idx;
      }
      return -1;
    };

    const pnI  = colIndex('partNo');
    const nmI  = colIndex('partName');
    const dnI  = colIndex('drawingNo');
    const ptI  = colIndex('partType');
    const qI   = colIndex('qty');

    const rows: Partial<BomLine>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map(c => c.replace(/"/g, '').trim());
      const partNo = pnI !== -1 ? cols[pnI] : `IMP-${String(i).padStart(3, '0')}`;
      if (!partNo) continue;

      rows.push({
        partNo,
        partName:     nmI !== -1 ? cols[nmI] : `Imported Part ${i}`,
        drawingNo:    dnI !== -1 ? cols[dnI] : `DWG-IMP-${String(i).padStart(3, '0')}`,
        partType:     ptI !== -1 ? cols[ptI] : 'Purchased Parts',
        qty:          qI  !== -1 ? (parseInt(cols[qI], 10) || 1) : 1,
        currentStage: 'Stage 0',
        status:       'Pending',
        remarks:      'Imported via Excel upload',
        image:        null,
      });
    }

    return rows;
  }

  /**
   * Simulates two rows for .xlsx/.xls demonstration.
   * Replace this method body with actual SheetJS parsing if available.
   */
  private simulateXlsxParse(): Partial<BomLine>[] {
    return [
      { partNo: 'XLS-001', partName: 'Imported Bracket A',  drawingNo: 'DWG-XLS-01', partType: 'Sheetmetal Parts', qty: 3,  currentStage: 'Stage 0', status: 'Pending', remarks: 'Imported via Excel upload', image: null },
      { partNo: 'XLS-002', partName: 'Imported Shaft B',    drawingNo: 'DWG-XLS-02', partType: 'Machining Parts',  qty: 10, currentStage: 'Stage 0', status: 'Pending', remarks: 'Imported via Excel upload', image: null },
    ];
  }

  confirmImport(): void {
    let added = 0;
    let skipped = 0;

    for (const r of this.importPreviewRows) {
      const dup = this.bomLines.find(
        b => b.partNo.toLowerCase() === (r.partNo || '').toLowerCase()
      );
      if (dup) { skipped++; continue; }

      this.bomLines = [
        ...this.bomLines,
        {
          id:           this.nextId++,
          partNo:       r.partNo!,
          partName:     r.partName!,
          drawingNo:    r.drawingNo!,
          partType:     r.partType!,
          qty:          r.qty!,
          currentStage: r.currentStage || 'Stage 0',
          status:       'Pending',
          remarks:      r.remarks || '',
          image:        null,
        },
      ];
      added++;
    }

    this.showUploadDialog = false;

    const msg = skipped > 0
      ? `${added} row(s) added. ${skipped} skipped (duplicate Part No).`
      : `${added} row(s) imported successfully.`;
    this.toast(msg);
  }

  /* ══════════════════════════════════════════════════════════════════
     DIALOG 4 — LINK IMAGE
  ══════════════════════════════════════════════════════════════════ */
  showLinkImageDialog = false;
  linkImageTargetRow: BomLine | null = null;
  selectedPartForLink: BomLine | null = null;
  selectedLinkImagePreview: string | null = null;

  openLinkImageDialog(row: BomLine | null): void {
    this.resetLinkImage();
    this.linkImageTargetRow = row;
    this.showLinkImageDialog = true;
  }

  resetLinkImage(): void {
    this.linkImageTargetRow = null;
    this.selectedPartForLink = null;
    this.selectedLinkImagePreview = null;
  }

  onImageFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      this.selectedLinkImagePreview = src;

      // Add to shared library if not already present
      const exists = this.imageLibrary.find(img => img.name === file.name);
      if (!exists) {
        this.imageLibrary = [...this.imageLibrary, { src, name: file.name }];
      }
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  selectLibraryImage(src: string): void {
    this.selectedLinkImagePreview = src;
  }

  saveLinkImage(): void {
    if (!this.selectedLinkImagePreview) return;

    const target = this.linkImageTargetRow ?? this.selectedPartForLink;
    if (!target) {
      this.toast('Please select a part to link the image to.', 'warn');
      return;
    }

    const idx = this.bomLines.findIndex(b => b.id === target.id);
    if (idx !== -1) {
      this.bomLines[idx] = { ...this.bomLines[idx], image: this.selectedLinkImagePreview };
      this.bomLines = [...this.bomLines];
    }

    this.showLinkImageDialog = false;
    this.toast(`Image linked to ${target.partNo} successfully.`);
  }

  /* ══════════════════════════════════════════════════════════════════
     IMAGE FULL-SCREEN PREVIEW
  ══════════════════════════════════════════════════════════════════ */
  showImagePreviewDialog = false;
  previewImageSrc: string | null = null;

  openImagePreview(src: string): void {
    this.previewImageSrc = src;
    this.showImagePreviewDialog = true;
  }

  /* ══════════════════════════════════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════════════════════════════════ */
  goBack(): void {
    this.router.navigate(['/project-owner-workbench']);
  }

  /* ══════════════════════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════════════════════ */
  private toast(
    detail: string,
    severity: 'success' | 'warn' | 'info' | 'error' = 'success'
  ): void {
    this.messageService.add({
      severity,
      summary: severity === 'success' ? 'Success' : severity === 'warn' ? 'Warning' : 'Info',
      detail,
      life: 3500,
    });
  }

  constructor(
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {}
}