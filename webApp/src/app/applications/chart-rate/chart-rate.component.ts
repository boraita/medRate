import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIChart } from 'primeng/chart';

import { BeatAnalyzerService } from '../services/beat-analyzer.service';
import { ValuesService } from '@applications/services/values.service';

@Component({
  selector: 'app-chart-rate',
  templateUrl: './chart-rate.component.html',
  styleUrls: ['./chart-rate.component.scss']
})
export class ChartRateComponent implements OnInit {
  data: any;
  options: any;
  labels = [];
  exportFile = [];
  beatAnalizeSubscription: Subscription;

  displaySidebar: boolean;

  @ViewChild('chart')
  chart: UIChart;

  constructor(
    private beatAnalyzer: BeatAnalyzerService,
    private valuesService: ValuesService
  ) {}
  ngOnInit(): void {
    this.chartConfiguration();
    this.initBeatChart();
  }

  startStop() {
    if (!this.beatAnalyzer.beat$.closed) {
      this.beatAnalizeSubscription.unsubscribe();
    } else {
      this.beatAnalyzer.analyser();
    }
  }
  playSound() {
    this.beatAnalyzer.playSound();
  }

  chartConfiguration() {
    this.setPointerNumbers();
    this.options = {
      title: {
        display: true,
        text: 'Rate ' + this.valuesService.device
      },
      tooltips: {
        enabled: false
      },
      legend: {
        display: false
      },
      pointHoverBorderWidth: 0
    };
    this.data = {
      labels: this.labels,
      datasets: [
        {
          data: [],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };
  }
  setPointerNumbers() {
    this.labels = [];
    for (
      let value = 1;
      value <= this.valuesService.numberPoint * 100;
      value++
    ) {
      this.labels.push(value);
    }
    this.chart.reinit();
  }
  initBeatChart() {
    this.beatAnalyzer.analyser();
    this.beatAnalizeSubscription = this.beatAnalyzer.beat$.subscribe(val => {
      val =
        val > this.valuesService.minVal && val < this.valuesService.maxVal
          ? val
          : 0;
      this.exportFile.push({
        time: this.beatAnalyzer.lastEvent,
        value: val
      });
      if (
        this.data.datasets[0].data.length ===
        this.valuesService.numberPoint * 100
      ) {
        this.data.datasets[0].data.shift();
      }
      this.data.datasets[0].data.push(val * 100);
      this.chart.refresh();
    });
  }
  resetValuesChart() {
    this.chart.reinit();
    this.data.datasets[0].data = [];
    this.setPointerNumbers();
  }
}
