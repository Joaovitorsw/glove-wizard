import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxCdkTableModule } from '@glove-wizard/ngx-cdk-table';
import { DEFAULT_PIPES_PROVIDERS } from 'libs/ngx-cdk-table/src/lib/models/generic-pipe';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    NgxCdkTableModule,
    BrowserAnimationsModule,
  ],
  providers: [DEFAULT_PIPES_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
