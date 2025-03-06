import { Component, Inject, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { 
    MatDialogRef, 
    MAT_DIALOG_DATA, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogModule 
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { NgxExtendedPdfViewerModule, NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';

@Component({
    selector: 'app-preview-pdf',
    standalone: true,
    imports: [ 
        NgxExtendedPdfViewerModule,
        MatButtonModule, 
        MatDialogModule, 
        CommonModule, 
        MatDialogContent, 
        MatDialogActions
    ],
    template: `
    
    <h2 mat-dialog-title>PDF Preview</h2>
    <mat-dialog-content>
      <ngx-extended-pdf-viewer [src]="data.pdf" useBrowserLocale="true" height="850px" zoom="70%" [textLayer]="true"></ngx-extended-pdf-viewer>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>

    `,
    providers: [NgxExtendedPdfViewerService],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PreviewPdf {

    constructor(private dialogRef: MatDialogRef<PreviewPdf>,
    private pdfService: NgxExtendedPdfViewerService,
    @Inject(MAT_DIALOG_DATA) public data: { pdf: string}
    ) {}

    close() {
        this.dialogRef.close();
    }

}