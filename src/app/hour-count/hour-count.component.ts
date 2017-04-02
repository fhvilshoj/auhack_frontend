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
  latest_date : string;

  constructor(private eventsService: EventsService, private usersService: UsersService) {
  }

  ngOnInit(): void {
    //TODO Update function call

    let userId = this.usersService.currentUser.id;
    console.log(userId);
    this.eventsService.getEventsForUser(userId)
      .then(delta => {
        console.log(this.latest_date);
        console.log(delta);
        if(!delta || delta.length == 0){
          return;
        }

        var minutes = 0;

        this.latest_date = delta[0].time;
        this.latest_date = delta[0].time;
        for(let i = 0; i < delta.length; i ++){
          if(delta[i].procrastination > 0.95 && delta[i].type !== "WebTracking"){
            minutes += 2;
          }
        }
        this.minutes_elapsed += minutes;
        let rest = this.minutes_elapsed % 60;
        this.minutes_display = rest;
        this.hours_display = (this.minutes_elapsed - rest) / 60;
      });
  }

  update_hours(delta : AUEvent[]) : void {
    console.log(delta);
    if(!delta || delta.length == 0){
       return;
    }

    var minutes = 0;

    console.log(delta[0]);
    console.log(delta[0].time);
    console.log(this.latest_date);
    this.latest_date = delta[0].time;
    this.latest_date = delta[0].time;
    for(let i = 0; i < delta.length; i ++){
      if(delta[i].procrastination > 0.95 && delta[i].type !== "WebTracking"){
        minutes += 2;
      }
    }
    this.minutes_elapsed += minutes;
    let rest = this.minutes_elapsed % 60;
    this.minutes_display = rest;
    this.hours_display = (this.minutes_elapsed - rest) / 60;
  }

}
