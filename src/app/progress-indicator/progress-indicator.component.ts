import {Component, OnInit} from "@angular/core";
import {UsersService} from "../Services/users.service";
import {EventsService} from "../Services/events.service";

@Component({
  moduleId: module.id,
  selector: 'progress-indicator',
  templateUrl: './progress-indicator.component.html'
})

export class ProgressIndicatorComponent implements OnInit {

  minutes_elapsed = 0;
  minutes_display = 0;
  hours_display = 0;

  slack_elapsed = 0;
  slack_minutes = 0;
  slack_hours = 0;

  latest_size = 0;


  hours = 4; // Same as in hour count
  percentage = (this.hours / 8) * 100;

  constructor(private eventsService: EventsService, private usersService: UsersService) {
  }

  private updateDisplay(delta): void {
    if (!delta || delta.length == 0) {
      return;
    }
    var old_length = this.latest_size;
    this.latest_size = delta.length;
    if (old_length >= this.latest_size) {
      console.log("No new updates");
      return;
    }
    else {
      console.log("Updating with " + (this.latest_size - old_length) + " events");
    }
    var minutes = 0;
    var slack = 0;
    for (let i = 0; i < this.latest_size - old_length; i++) {
      if (delta[i].procrastination < 0.35 && delta[i].type !== "WebTracking") {
        minutes += 1;
      } else if (delta[i].type !== "WebTracking") {
        slack += 1;
      }
    }

    this.minutes_elapsed += minutes;
    let rest = this.minutes_elapsed % 60;
    this.minutes_display = rest;
    this.hours_display = (this.minutes_elapsed - rest) / 60;

    this.percentage = (this.hours_display*100 / 8) + (1/8) * this.minutes_display * 100 / 60;
    // this.hours = 2;
  }

  private performUpdate(): void {
    this.eventsService.getEventsForUser(this.usersService.currentUser.id)
      .then(this.updateDisplay.bind(this));
  }

  ngOnInit(): void {
    //TODO Update function call
    this.performUpdate();
    setInterval(this.performUpdate.bind(this), 5000);
  }
}
