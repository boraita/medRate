import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BeatAnalyzerService {
	beat$ = new Subject<number>();
	signal: AnalyserNode;
	valueRate: number;
	lastEvent: number;

	async analyser() {
		const stream = await this.getStream();
		const audioCtx = new AudioContext();
		const source = audioCtx.createMediaStreamSource(stream);
		this.signal = audioCtx.createAnalyser();
		const dataArray = new Float32Array(this.signal.fftSize);
		this.lastEvent = new Date().getTime();
		source.connect(this.signal);

		const analyze = () => {
			this.signal.getFloatTimeDomainData(dataArray);
			const samples = Array.from(dataArray).map(Math.abs);
			const avgPower = samples.reduce((x, y) => x + y) / samples.length;
			this.valueRate = avgPower;
			this.beat$.next(avgPower);
			this.lastEvent = new Date().getTime();
			requestAnimationFrame(analyze);
		};

		analyze();
	}

	playSound() {
		const audioCtx = new AudioContext();
		const oscillator = audioCtx.createOscillator();
		oscillator.type = 'square';
		oscillator.frequency.value = 5000; // value in hertz
		oscillator.connect(audioCtx.destination);
		oscillator.start();
	}
	getStream() {
		if (navigator.mediaDevices.getUserMedia === undefined) {
			navigator.mediaDevices.getUserMedia = function(constraints) {
				const n = <any>navigator;
				// First get ahold of the legacy getUserMedia, if present
				const getUserMedia = n.webkitGetUserMedia || n.mozGetUserMedia;

				// Some browsers just don't implement it - return a rejected promise with an error
				// to keep a consistent interface
				if (!getUserMedia) {
					return Promise.reject(
						new Error(
							'getUserMedia is not implemented in this browser'
						)
					);
				}

				// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
				return new Promise(function(resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject);
				});
			};
		}
		return navigator.mediaDevices.getUserMedia({ audio: true });
	}
}
