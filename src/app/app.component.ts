import { Component, OnInit } from '@angular/core';
import { DataTable } from './data-table';
import { DataTableService } from './data-table.service';
import { GauComponent } from './gau.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataTableService],

})

export class AppComponent implements OnInit {
  title = 'app works!';
  dataTables;
  dataTable1: DataTable;

  pieChartOptions = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Focus', 0],
      ['Procrastination', 0]
    ],
    options: {'title': 'Tasks'}
  };

  barChartOptions = {
    chartType: 'BarChart',
    dataTable: [
      ['User', 'Productivity', 'Procrastination'],
      ['User 1', 60, 40],
      ['User 2', 70, 30],
      ['User 3', 20, 80]
    ],
    options: {'title': 'GAME ON MOTHERFUCKERS!'}
  };
  constructor(private dataTableService: DataTableService) { }

  getData(): void {
    this.dataTableService.getDataTables().then(dataTables => {
      this.dataTables = dataTables;
      console.log(dataTables);
      console.log(this.dataTables);
      this.pieChartOptions.dataTable[1][1] = this.dataTables[0].focus;
      this.pieChartOptions.dataTable[2][1] = this.dataTables[0].procrastination;
    });
  }

  ngOnInit(): void {
    this.getData();
  }



}
