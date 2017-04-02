import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { AppComponent } from './app.component';
import { DataTableService } from './data-table.service';
import {EventsService} from "./Services/events.service";
import {EventListComponent} from "./event-list.component";
import {WastedTimeComponent} from "./wasted-time/wasted-time.component";
import {ProgressIndicatorComponent} from "./progress-indicator/progress-indicator.component";
import {HourCountComponent} from "./hour-count/hour-count.component";
import {CompetitionComponent} from "./competition/competition.component";
import {ServicesService} from "./Services/services.service";
import {UsersService} from "./Services/users.service";

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    WastedTimeComponent,
    ProgressIndicatorComponent,
    HourCountComponent,
    CompetitionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2GoogleChartsModule,
    HttpModule
  ],
  providers: [DataTableService, EventsService, ServicesService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
