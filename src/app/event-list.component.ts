import {Component, OnInit} from '@angular/core';
import {AUEvent} from './Models/AUEvent'
import {EventsService} from "./Services/events.service";

@Component({
    moduleId: module.id,
    selector: 'event-list',
    templateUrl: './event-list.component.html',
    providers: [EventsService]
})

export class EventListComponent implements OnInit {

    events : AUEvent[];

    constructor(private eventsService: EventsService) {}

    ngOnInit(): void {
      this.eventsService.getEventsForAllUsers().then(evts => this.events = evts);
    }
}
