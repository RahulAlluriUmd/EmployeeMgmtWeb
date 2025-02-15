import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../core/models/dialogData';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
