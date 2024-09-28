import { Component, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { portfolioSubrulesSlice } from '../../states/portfolio-subrule/portfolio-subrule.selector';
import { counterpartySubrulesSlice } from '../../states/counterparty-subrule/counterparty-subrule.selector';
import { priceSubrulesSlice } from '../../states/price-subrule/price-subrule.selector';
import { Observable } from 'rxjs';
import { FieldOptionName } from '../rule-configuration/rule-configuration.component';
import { SubruleComponent } from '../subrule/subrule.component';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [CardModule, SubruleComponent, AsyncPipe, NgFor],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.css'
})
export class RuleComponent implements OnInit {
  @Input()
  field: string = "";

  rules$: Observable<any[]> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    if (this.field === FieldOptionName.Portfolio) {
      this.rules$ = this.store.select(portfolioSubrulesSlice)
    } else if (this.field === FieldOptionName.CounterParty) {
      this.rules$ = this.store.select(counterpartySubrulesSlice)
    } else if (this.field === FieldOptionName.Price) {
      this.rules$ = this.store.select(priceSubrulesSlice)
    }
  }

}
