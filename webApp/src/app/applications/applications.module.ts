import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';

import { SharedModule } from '@shared/shared.module';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ChartRateComponent } from './chart-rate/chart-rate.component';
import { BeatAnalyzerService } from './services/beat-analyzer.service';
import { ConfigurationValuesComponent } from './configuration-values/configuration-values.component';
import { ValuesService } from './services/values.service';

@NgModule({
  imports: [
    ApplicationsRoutingModule,
    SharedModule,
    ChartModule,
    ButtonModule,
    SidebarModule
  ],
  declarations: [
    ApplicationsComponent,
    ChartRateComponent,
    ConfigurationValuesComponent
  ],
  providers: [BeatAnalyzerService, ValuesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApplicationsModule {}
