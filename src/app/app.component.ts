import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/primeng';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferTime';

import { BeatAnalyzerService } from './beat-analyzer.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data: any;
  labels = [];

  @ViewChild('chart') chart: UIChart;

  ngOnInit(): void {
    this.beatAnalyzer.init();
    for (let value = 1; value <= 60; value++) {
      this.labels.push(value);
    }
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Rate value',
          data: []
        }
      ]
    };
    this.beatAnalyzer.beat$.subscribe(val => {
      if (this.data.datasets[0].data.length === 60) {
        this.data.datasets[0].data.shift();
      }
      this.data.datasets[0].data.push(val);
      this.chart.refresh();
    });
  }

  constructor(private beatAnalyzer: BeatAnalyzerService) {}

  get beat$() {
    return this.beatAnalyzer.beat$;
  }
}
