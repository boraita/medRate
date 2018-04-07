import { Component, Inject, OnInit } from '@angular/core';
import { BeatAnalyzerService } from './beat-analyzer.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/bufferTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private beatAnalyzer: BeatAnalyzerService) {
    this.beatAnalyzer.init();
    this.beatAnalyzer.beat$
      .filter(val => val > 0.05)
      .bufferTime(100)
      .filter(val => val.length > 0)
      .subscribe();
  }

  get beat$() {
    return this.beatAnalyzer.beat$;
  }
}
