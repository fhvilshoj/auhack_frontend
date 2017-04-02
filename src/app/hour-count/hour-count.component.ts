import {Component, OnInit} from "@angular/core";
import {EventsService} from "../Services/events.service";
import {UsersService} from "../Services/users.service";
import {AUEvent} from "../Models/AUEvent";

@Component({
  moduleId: module.id,
  selector: 'hour-count',
  templateUrl: './hour-count.component.html',
  styleUrls: ['./hour-count.component.css'],
  providers: [EventsService, UsersService]
})

export class HourCountComponent implements OnInit {

  minutes_elapsed = 0;
  minutes_display = 0;
  hours_display = 0;

  slack_elapsed = 0;
  slack_minutes = 0;
  slack_hours = 0;

  latest_size = 0;

  constructor(private eventsService: EventsService, private usersService: UsersService) {
  }

  private updateDisplay(delta) : void {
    if (!delta || delta.length == 0) {
      return;
    }
    var old_length = this.latest_size;
    this.latest_size = delta.length;
    if(old_length >= this.latest_size) { console.log("No new updates"); return; }
    else { console.log("Updating with " + (this.latest_size - old_length) + " events");}
    var minutes = 0;
    var slack = 0;
    for (let i = 0; i < this.latest_size - old_length; i++) {
      if (delta[i].procrastination < 0.35 && delta[i].type !== "WebTracking") {
        minutes += 1;
      } else if(delta[i].type !== "WebTracking"){
        slack += 1;
      }
    }



    this.slack_elapsed += slack;
    let rest_slack = this.slack_elapsed % 60;
    this.slack_minutes = rest_slack;
    this.slack_hours = (this.slack_elapsed - rest_slack) / 60;

    this.minutes_elapsed += minutes;
    let rest = this.minutes_elapsed % 60;
    this.minutes_display = rest;
    this.hours_display = (this.minutes_elapsed - rest) / 60;
  }

  private performUpdate() : void {
    this.eventsService.getEventsForUser(this.usersService.currentUser.id)
      .then(this.updateDisplay.bind(this));
  }

  ngOnInit(): void {
    //TODO Update function call
    this.performUpdate();
    setInterval(this.performUpdate.bind(this), 5000);
  }
}
