import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/primeng';
import { Subscription } from 'rxjs';

import { BeatAnalyzerService } from './beat-analyzer.service';
import { devicesEnum } from './devices.enum';

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
		this.beatAnalyzer.analyser();
		this.chartConfiguration();
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
	setPointerNumbers() {
		this.labels = [];
		for (let value = 1; value <= this.numberPoint; value++) {
			this.labels.push(value);
		}
		this.chart.reinit();
	}
}
