import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BeatAnalyzerService {
  beat$ = new Subject<number>();
  signal: AnalyserNode;
  valueRate: number;

  constructor() {}

  async analyser() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    this.signal = audioCtx.createAnalyser();
    const dataArray = new Float32Array(this.signal.fftSize);
    let lastEvent = new Date().getTime();
    source.connect(this.signal);

    const analyze = () => {
      this.signal.getFloatTimeDomainData(dataArray);
      const samples = Array.from(dataArray).map(Math.abs);
      const avgPower = samples.reduce((x, y) => x + y) / samples.length;
      this.valueRate = avgPower;
      this.beat$.next(avgPower);
      lastEvent = new Date().getTime();
      requestAnimationFrame(analyze);
    };

    analyze();
  }
}
