import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxCdkTableModule } from '@glove-wizard/ngx-cdk-table';
import { DEFAULT_PIPES_PROVIDERS } from 'libs/ngx-cdk-table/src/lib/models/interface/generic-pipe';
import { NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { DescontoComponent } from './components/desconto/desconto.component';

@NgModule({
  declarations: [AppComponent, DescontoComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    MatButtonModule,
    NgxCdkTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [DEFAULT_PIPES_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
