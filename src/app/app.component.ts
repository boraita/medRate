import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/primeng';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferTime';

import { BeatAnalyzerService } from './beat-analyzer.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any;
  options: any;
  labels = [];
  exportFile = [];
  numberPoint = 700;
  maxVal = 2;
  minVal = 0;
  @ViewChild('chart') chart: UIChart;

  constructor(private beatAnalyzer: BeatAnalyzerService) {}

  ngOnInit(): void {
    this.beatAnalyzer.analyser();
    this.chartConfiguration();
    this.beatAnalyzer.beat$.subscribe(val => {
      val = val > this.minVal && val < this.maxVal ? val : 0;
      this.exportFile.push({ time: this.beatAnalyzer.lastEvent, value: val });
      if (this.data.datasets[0].data.length === this.numberPoint) {
        this.data.datasets[0].data.shift();
      }
      this.data.datasets[0].data.push(val * 100);
      this.chart.refresh();
    });
  }

  startStop() {
    if (!this.beatAnalyzer.beat$.closed) {
      this.beatAnalyzer.beat$.unsubscribe();
    } else {
      this.beatAnalyzer.beat$ = new Subject<number>();
      this.beatAnalyzer.analyser();
    }
  }
  playSound() {
    this.beatAnalyzer.playSound();
  }
  switch() {
    this.maxVal = 0.001;
    this.minVal = 0.0001;
  }
  chartConfiguration() {
    for (let value = 1; value <= this.numberPoint; value++) {
      this.labels.push(value);
    }
    this.options = {
      title: {
        display: true
      },
      legend: {
        position: 'bottom'
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
}
