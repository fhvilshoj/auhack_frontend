import {Component, OnInit} from "@angular/core";
import {EventsService} from "../Services/events.service";
import {UsersService} from "../Services/users.service";
import {AUEvent} from "../Models/AUEvent";

@Component({
  moduleId: module.id,
  selector: 'hour-count',
  templateUrl: './hour-count.component.html',
  providers: [EventsService, UsersService]
})

export class HourCountComponent implements OnInit {

  minutes_elapsed = 0;
  minuts_display = 0;
  hours_display = 0;
  latest_date: Date;

  constructor(private eventsService: EventsService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    //TODO Update function call
    this.eventsService.getEventsForUser(this.usersService.currentUser.id)
      .then(this.update_hours)
      .catch(this.handleError);
  }

  update_hours(delta : AUEvent[]) : void {
    if(!delta || delta.length == 0){
      return;
    }
    let minutes = 0;
    this.latest_date = delta[0].time;
    for(let i = 0; i < delta.length; i ++){
      if(delta[i].procrastination > 0.95){
        minutes += 2;
      }
    }
    this.minutes_elapsed += minutes;
    let rest = this.minutes_elapsed % 60;
    this.minuts_display = rest;
    this.hours_display = (this.minutes_elapsed - rest) / 60;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
