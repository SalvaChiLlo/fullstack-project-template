import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoComponent } from '@salvachll/client/ui-components'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: true,
  imports: [RouterModule, NgbModule, TodoComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent { }
