import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIChart } from 'primeng/chart';

import { devicesEnum } from '../../core/enums/devices.enum';
import { BeatAnalyzerService } from '../services/beat-analyzer.service';

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
  minVal: number;
  maxVal: number;
  beatAnalizeSubscription: Subscription;
  device: devicesEnum;

  numberPoint = 700;
  heardRateMax = 0.57;
  heardRateMin = 0.14;
  breathRateMax = 0.1;
  breathRateMin = 0.002;

  @ViewChild('chart')
  chart: UIChart;

  constructor(private beatAnalyzer: BeatAnalyzerService) {}
  ngOnInit(): void {
    this.device = devicesEnum.heart;
    this.minVal = this.heardRateMin;
    this.maxVal = this.heardRateMax;
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
  switch() {
    this.device =
      devicesEnum.breathe === this.device
        ? devicesEnum.heart
        : devicesEnum.breathe;
    this.chart.reinit();
    this.data.datasets[0].data = [];
    this.maxVal =
      this.heardRateMax === this.maxVal
        ? this.breathRateMax
        : this.heardRateMax;
    this.minVal =
      this.heardRateMin === this.minVal
        ? this.breathRateMin
        : this.heardRateMin;
  }
  chartConfiguration() {
    this.setPointerNumbers();
    this.options = {
      title: {
        display: true,
        text: 'Rate value'
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
          label: 'Rate value',
          data: [],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };
  }
  setPointerNumbers() {
    this.labels = [];
    for (let value = 1; value <= this.numberPoint; value++) {
      this.labels.push(value);
    }
    this.chart.reinit();
  }
  initBeatChart() {
    this.beatAnalyzer.analyser();
    this.beatAnalizeSubscription = this.beatAnalyzer.beat$.subscribe(val => {
      val = val > this.minVal && val < this.maxVal ? val : 0;
      this.exportFile.push({
        time: this.beatAnalyzer.lastEvent,
        value: val
      });
      if (this.data.datasets[0].data.length === this.numberPoint) {
        this.data.datasets[0].data.shift();
      }
      this.data.datasets[0].data.push(val * 100);
      this.chart.refresh();
    });
  }
}