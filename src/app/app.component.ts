import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RuleConfigurationComponent } from "./components/rule-configuration/rule-configuration.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RuleConfigurationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'filter-rule-config-system';
}
