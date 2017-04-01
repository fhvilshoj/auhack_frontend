import { Component } from '@angular/core';

@Component({
  selector: 'app-gau-component',
  template: '<div id="gauge_chart" [chartData]="gauge_ChartData" [chartOptions]= "gauge_ChartOptions" chartType="Gauge" GoogleChart></div>'
})

export class GauComponent {
  gauge_ChartData = [
    ['Label', 'Value'],
    ['Systolic', 120],
    ['Diastolic', 80]];
  gauge_ChartOptions = {
    width: 400, height: 120,
    redFrom: 90, redTo: 100,
    yellowFrom: 75, yellowTo: 90,
    minorTicks: 5
  };
}
