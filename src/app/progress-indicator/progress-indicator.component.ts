import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'progress-indicator',
    templateUrl: './progress-indicator.component.html'
})

export class ProgressIndicatorComponent implements OnInit {
  hours = 4; // Same as in hour count
  percentage = (this.hours / 8) * 100;

    constructor() {
    }

    ngOnInit(): void {
    }
}
