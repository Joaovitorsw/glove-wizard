import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutoAbbrevDirective } from './components/directives/auto-abbrev/auto-abbrev.directive';
import { ViewContainerRefDirective } from './components/directives/view-container-ref/view-container-ref.directive';
import { NgxCdkTableComponent } from './components/ngx-cdk-table/ngx-cdk-table.component';
import { CheckboxInputComponent } from './components/ngx-inputs/checkbox-input/checkbox-input.component';
import { DateInputComponent } from './components/ngx-inputs/date-input/date-input.component';
import { NumberInputComponent } from './components/ngx-inputs/number-input/number-input.component';
import { SelectInputComponent } from './components/ngx-inputs/select-input/select-input.component';
import { TextInputComponent } from './components/ngx-inputs/text-input/text-input.component';
import { GenericPipe } from './pipes/generic-pipe/generic.pipe';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    NgxCdkTableComponent,
    GenericPipe,
    AutoAbbrevDirective,
    ViewContainerRefDirective,
    TextInputComponent,
    NumberInputComponent,
    DateInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
  ],
  exports: [NgxCdkTableComponent, GenericPipe, AutoAbbrevDirective],
})
export class NgxCdkTableModule {}
