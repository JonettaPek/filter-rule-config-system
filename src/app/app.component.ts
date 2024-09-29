import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldOptionName, RuleConfigurationComponent } from "./components/rule-configuration/rule-configuration.component";
import { RuleComponent } from "./components/rule/rule.component";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { addLogicalOperatorCombination } from './states/logical-operator-combination/logical-operator-combination.actions';
import { availableFieldsSlice, logicalOperatorCombinationSlice } from './states/logical-operator-combination/logical-operator-combination.selector';
import { map, Observable, take } from 'rxjs';
import { AppState } from './states/app.state';
import { portfolioSubrulesSlice } from './states/portfolio-subrule/portfolio-subrule.selector';
import { counterpartySubrulesSlice } from './states/counterparty-subrule/counterparty-subrule.selector';
import { priceSubrulesSlice } from './states/price-subrule/price-subrule.selector';

enum LogicalOperator {
  Union = 'Union',
  Intersection = 'Intersection'
}
interface LogicalOperatorOption {
  name: LogicalOperator,
  code: LogicalOperator
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, NgIf, RouterOutlet, RuleConfigurationComponent, RuleComponent, DropdownModule, FormsModule, ButtonModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  fields: FieldOptionName[] = [];

  availableFields$: Observable<string[]> | undefined;

  logicalOperators: LogicalOperatorOption[] = [];

  selectedLogicalOperatorOptions: { [key: string]: string } = {};

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.fields = Object.values(FieldOptionName)
    this.logicalOperators = [
      {
        name: LogicalOperator.Intersection,
        code: LogicalOperator.Intersection
      },
      {
        name: LogicalOperator.Union,
        code: LogicalOperator.Union
      }
    ]

    this.availableFields$ = this.store.select(availableFieldsSlice).pipe(
      map((fieldsSet) => Array.from(fieldsSet))
    )
  }

  // ngOnChanges() {
  //   this.store.select(portfolioSubrulesSlice).pipe(take(1)).subscribe(subrules => {
  //     console.log("b")
  //     if (subrules.length > 0) {
  //       console.log("a")
  //       this.availableFields = [...this.availableFields, FieldOptionName.Portfolio]
  //     }
  //     this.cdr.markForCheck();
  //   })

  //   this.store.select(counterpartySubrulesSlice).pipe(take(1)).subscribe(subrules => {
  //     if (subrules.length > 0) {
  //       this.availableFields = [...this.availableFields, FieldOptionName.CounterParty]
  //       this.cdr.markForCheck();
  //     }
  //   })

  //   this.store.select(priceSubrulesSlice).pipe(take(1)).subscribe(subrules => {
  //     if (subrules.length > 0) {
  //       this.availableFields = [...this.availableFields, FieldOptionName.Price]
  //       this.cdr.markForCheck();
  //     }
  //   })
  // }

  onLogicalOperatorChange(field: string, selectedOperator: string) {
    this.selectedLogicalOperatorOptions[field] = selectedOperator;
  }

  handleSave() {
    this.store.dispatch(addLogicalOperatorCombination({ newCombination: this.selectedLogicalOperatorOptions }))
    this.store.select(logicalOperatorCombinationSlice).pipe(take(1)).subscribe(state => 
      console.log(state)
    )   
  }

}
