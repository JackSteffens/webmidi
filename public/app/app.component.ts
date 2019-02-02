import { Component } from '@angular/core';
import { CommandService } from '../services/command.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /*
  CommandService requires to be injected on startup, because OnInit() needs to be called.
  Key.class needs the data that's being generated in CommandService.ngOnInit(), but the Key class cannot
  inject the service itself. Need to find a way how to circumvent this.
   */
  constructor(private commandService: CommandService) {
  }
}
