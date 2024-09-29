import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { portfolioSubrulesSlice } from '../../states/portfolio-subrule/portfolio-subrule.selector';
import { counterpartySubrulesSlice } from '../../states/counterparty-subrule/counterparty-subrule.selector';
import { priceSubrulesSlice } from '../../states/price-subrule/price-subrule.selector';
import { Observable, take } from 'rxjs';
import { FieldOptionName } from '../rule-configuration/rule-configuration.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Subrule } from '../../states/portfolio-subrule/portfolio-subrule.reducer';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { deletePortfolioSubrule, editPortfolioSubrule } from '../../states/portfolio-subrule/portfolio-subrule.actions';
import { Dialog } from 'primeng/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { deleteCounterpartySubrule } from '../../states/counterparty-subrule/counterparty-subrule.actions';
import { deletePriceSubrule } from '../../states/price-subrule/price-subrule.actions';
@Component({
  selector: 'app-rule',
  standalone: true,
  imports: [CardModule, AsyncPipe, NgFor, TableModule, CommonModule, SpeedDialModule, DynamicDialogModule],
  templateUrl: './rule.component.html',
  styleUrl: './rule.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService]
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
    private dialogService: DialogService
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

  }
  
  ngOnDestroy(): void {
    // unsubscribe to custom observables
  }
  
  getActions(subrule: Subrule, rowIndex: number): MenuItem[] {
    return [
      {
        icon: 'pi pi-pencil',
        command: () => {
          this.dialogService.open(EditDialogComponent, {
            width: '50vw',
            height: '60vh',
            showHeader: false,
            contentStyle: {
              background: '#111928',
              opacity: '0.95',
              color: 'white'
            },
            modal:true,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            data: {
              subrule
            }
          })
        }
      },
      {
          icon: 'pi pi-refresh',
          command: () => {
  
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
            if (subrule.field === FieldOptionName.Portfolio) {
              this.store.dispatch(deletePortfolioSubrule({ index: subrule.index }));
            } else if (subrule.field === FieldOptionName.CounterParty) {
              this.store.dispatch(deleteCounterpartySubrule({ index: subrule.index }));
            } else if (subrule.field === FieldOptionName.Price) {
              this.store.dispatch(deletePriceSubrule({ index: subrule.index }));
            }
            // this.store.select(portfolioSubrulesSlice).pipe(take(1)).subscribe(list => 
            //   list.forEach(item => console.log(item))
            // )
            // this.store.select(counterpartySubrulesSlice).pipe(take(1)).subscribe(list => 
            //   list.forEach(item => console.log(item))
            // )
            // this.store.select(priceSubrulesSlice).pipe(take(1)).subscribe(list => 
            //   list.forEach(item => console.log(item))
            // )
          }
      }
    ];
  }

}
