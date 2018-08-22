import { Injectable } from '@angular/core';
import { devicesEnum } from '@core/enums/devices.enum';
import {
  HEARD_RATE_MAX,
  HEARD_RATE_MIN,
  BREATH_RATE_MAX,
  BREATH_RATE_MIN,
  POSITIONS_NUMBERS_CHART
} from '@core/config/values.config';

@Injectable()
export class ValuesService {
  device: devicesEnum = devicesEnum.heart;
  maxVal: number;
  minVal: number;
  numberPoint: number;
  private heardRateMax = HEARD_RATE_MAX;
  private heardRateMin = HEARD_RATE_MIN;
  private breathRateMax = BREATH_RATE_MAX;
  private breathRateMin = BREATH_RATE_MIN;

  constructor() {
    this.maxVal = this.heardRateMax;
    this.minVal = this.heardRateMin;
    this.numberPoint = POSITIONS_NUMBERS_CHART;
  }

  switch() {
    this.device =
      devicesEnum.breathe === this.device
        ? devicesEnum.heart
        : devicesEnum.breathe;
    if (devicesEnum.breathe === this.device) {
      this.maxVal = this.breathRateMax;
      this.minVal = this.breathRateMin;
    } else {
      this.maxVal = this.heardRateMax;
      this.minVal = this.heardRateMin;
    }
  }
}
