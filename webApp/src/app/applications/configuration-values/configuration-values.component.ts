import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ValuesService } from '../services/values.service';
import { devicesEnum } from '@core/enums/devices.enum';

@Component({
  selector: 'app-configuration-values',
  templateUrl: './configuration-values.component.html',
  styleUrls: ['./configuration-values.component.scss']
})
export class ConfigurationValuesComponent implements OnInit {
  maxVal: number;
  minVal: number;
  device: devicesEnum;
  numberPoint: number;
  @Output()
  startStop: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  resetChart: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private valuesService: ValuesService) {}

  ngOnInit() {
    this.setValues();
  }

  switch() {
    this.valuesService.switch();
    this.setValues();
    this.setResetChart();
  }
  setStartStop() {
    this.startStop.emit();
  }
  setValues() {
    this.numberPoint = this.valuesService.numberPoint;
    this.device = this.valuesService.device;
    this.maxVal = this.valuesService.maxVal;
    this.minVal = this.valuesService.minVal;
  }
  setResetChart() {
    this.resetChart.emit();
  }

  applyChanges() {
    this.valuesService.numberPoint = this.numberPoint;
    this.valuesService.maxVal = this.maxVal;
    this.valuesService.minVal = this.minVal;
    this.setResetChart();
  }
}
