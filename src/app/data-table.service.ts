import { Injectable } from '@angular/core';

import { DataTable } from './data-table';
import { DATATABLES } from './mock-data-tables';

@Injectable()
export class DataTableService {
  /*
  getDataTables(): DataTable[] {
    return DATATABLES;
  }
  */

  getDataTables(): Promise<DataTable[]> {
    console.log('From service');
    console.log(DATATABLES);
    return Promise.resolve(DATATABLES);
  }
}
