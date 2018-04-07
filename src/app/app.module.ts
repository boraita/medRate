import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ChartModule} from 'primeng/chart';

import { BeatAnalyzerService } from './beat-analyzer.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ChartModule],
  providers: [BeatAnalyzerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
