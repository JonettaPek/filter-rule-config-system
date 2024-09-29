import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldOptionName, RuleConfigurationComponent } from "./components/rule-configuration/rule-configuration.component";
import { RuleComponent } from "./components/rule/rule.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, RouterOutlet, RuleConfigurationComponent, RuleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  fields: FieldOptionName[] = [];

  constructor() {

  }
  ngOnInit(): void {
    this.fields = Object.values(FieldOptionName)
  }

}
