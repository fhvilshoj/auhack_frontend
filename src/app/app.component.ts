import { Component, OnInit } from '@angular/core';
import { DataTable } from './data-table';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [DataTableService],

})

export class AppComponent implements OnInit {
  title = 'Pun-ish those procrastinators!';
  dataTables;
  dataTable1: DataTable;

  pieChartOptions = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Focus', 0],
      ['Procrastination', 0]
    ],
    options: {'title': 'User 1'}
  };

  barChartOptions = {
    chartType: 'BarChart',
    dataTable: [
      ['User', 'Productivity', 'Procrastination'],
      ['username', 0, 0],
      ['username', 0, 0],
      ['username', 0, 0]
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
      for (let i = 0; i < dataTables.length; i++ ) {
        this.barChartOptions.dataTable[i + 1][0] = this.dataTables[i].task;
        this.barChartOptions.dataTable[i + 1][1] = this.dataTables[i].focus;
        this.barChartOptions.dataTable[i + 1][2] = this.dataTables[i].procrastination;
      }
    });
  }

  ngOnInit(): void {
    this.getData();
  }



}
