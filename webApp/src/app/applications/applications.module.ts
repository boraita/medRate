import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { SpinnerModule } from 'primeng/spinner';

import { SharedModule } from '@shared/shared.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ChartRateComponent } from './chart-rate/chart-rate.component';
import { BeatAnalyzerService } from './services/beat-analyzer.service';

@NgModule({
  imports: [
    ApplicationsRoutingModule,
    SharedModule,
    ChartModule,
    ButtonModule,
    SpinnerModule
  ],
  declarations: [ApplicationsComponent, ChartRateComponent],
  providers: [BeatAnalyzerService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ApplicationsModule {}
