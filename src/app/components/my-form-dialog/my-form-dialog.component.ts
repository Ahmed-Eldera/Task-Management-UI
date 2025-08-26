import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

export interface DialogData {
  name: string;
  status: string;
  description: string;
  dueDate: Date;
}



@Component({
  selector: 'my-form-dialog',
  standalone: true,
  templateUrl: 'my-form-dialog.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class MyFormDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MyFormDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  // Separate models for each field
  name = model(this.data?.name ?? '');
  status = model(this.data?.status ?? '');
  description = model(this.data?.description ?? '');
  dueDate = model<Date | null>(this.data?.dueDate ?? null);

  onNoClick(): void {
    this.dialogRef.close();
  }
}

