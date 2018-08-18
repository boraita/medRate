import { NgModule } from '@angular/core';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { ChartRateComponent } from './chart-rate/chart-rate.component';

@NgModule({
  imports: [ApplicationsRoutingModule],
  declarations: [ApplicationsComponent, ChartRateComponent]
})
export class ApplicationsModule {}
