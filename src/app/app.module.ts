import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppComponent } from './app.component';
import { DataTableService } from './data-table.service';
import {EventsService} from "./Services/events.service";
import {EventListComponent} from "./event-list.component";

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2GoogleChartsModule,
    HttpModule
  ],
  providers: [DataTableService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
