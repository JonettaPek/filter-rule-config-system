import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { portfolioSubrulesSlice } from '../../states/portfolio-subrule/portfolio-subrule.selector';
import { counterpartySubrulesSlice } from '../../states/counterparty-subrule/counterparty-subrule.selector';
import { priceSubrulesSlice } from '../../states/price-subrule/price-subrule.selector';
import { Observable } from 'rxjs';
import { FieldOptionName } from '../rule-configuration/rule-configuration.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Subrule } from '../../states/portfolio-subrule/portfolio-subrule.reducer';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [CardModule, AsyncPipe, NgFor, TableModule, CommonModule, SpeedDialModule],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class RuleComponent implements OnInit, OnDestroy {
  @Input()
  field: string = '';

  rules$: Observable<Subrule[]> | undefined;

  rules: Subrule[] = [];

  // mock data
  // {
  //   index: 0,
  //   field: 'Portfolio',
  //   fieldType: 'string',
  //   condition: 'Containing',
  //   value: 'SG'
  // }

  actions: MenuItem[] = [];
  constructor(
    private store: Store<AppState>,
    private messageService: MessageService
  ) { 
  }
  
  ngOnInit(): void {
    if (this.field === FieldOptionName.Portfolio) {
      this.rules$ = this.store.select(portfolioSubrulesSlice)
    } else if (this.field === FieldOptionName.CounterParty) {
      this.rules$ = this.store.select(counterpartySubrulesSlice)
    } else if (this.field === FieldOptionName.Price) {
      this.rules$ = this.store.select(priceSubrulesSlice)
    }
    
    this.rules$?.subscribe(rules => {
      this.rules = rules;
    });

    this.actions = [
      {
          icon: 'pi pi-pencil',
          command: () => {
              this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
          }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
              this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
              this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
          }
      }
    ];
  }
  
  ngOnDestroy(): void {
    // unsubscribe to custom observables
  }

}
