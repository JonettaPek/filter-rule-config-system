import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessagesModule } from 'primeng/messages';
import { addPortfolioSubrule } from '../../states/portfolio-subrule/portfolio-subrule.actions';
import { PortfolioSubrule, Subrule } from '../../states/portfolio-subrule/portfolio-subrule.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { portfolioSubrulesSlice } from '../../states/portfolio-subrule/portfolio-subrule.selector';
import { Observable, take } from 'rxjs';
import { CounterpartySubrule } from '../../states/counterparty-subrule/counterparty-subrule.reducer';
import { PriceSubrule } from '../../states/price-subrule/price-subrule.reducer';
import { counterpartySubrulesSlice } from '../../states/counterparty-subrule/counterparty-subrule.selector';
import { priceSubrulesSlice } from '../../states/price-subrule/price-subrule.selector';
import { addCounterpartySubrule } from '../../states/counterparty-subrule/counterparty-subrule.actions';
import { addPriceSubrule } from '../../states/price-subrule/price-subrule.actions';

interface MenuItem {
  label: string,
  command(): void
}

export enum FieldOptionName {
  Portfolio = 'Portfolio',
  CounterParty = 'Counterparty',
  Price = 'Price'
}

export enum FieldOptionCode {
  Portfolio = 'portfolio',
  CounterParty = 'counterparty',
  Price = 'price'
}

export interface FieldOption {
  name: FieldOptionName;
  code: FieldOptionCode;
}

export enum FieldType {
  String = 'string',
  Number = 'number',
  Date = 'Date'
}

export enum StringCondition {
  Containing = 'Containing',
  NotContaining = 'Not Containing',
  BeginningWith = 'Beginning With',
  EndingWith = 'Ending With'
}

export enum NumberCondition {
  GreaterThan = '>',
  GreaterThanOrEqualTo = '>=',
  LessThan = '<',
  LessThanOrEqualTo = '<=',
  EqualTo = '=',
  NotEqualTo = '!='
}

export interface ConditionOption {
  name: StringCondition | NumberCondition;
  code: StringCondition | NumberCondition;
}

interface Message {
  severity: string,
  detail: string
}

@Component({
  selector: 'app-rule-configuration',
  standalone: true,
  imports: [DropdownModule, FormsModule, SplitButtonModule, MessagesModule],
  templateUrl: './rule-configuration.component.html',
  styleUrl: './rule-configuration.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RuleConfigurationComponent implements OnInit {
  menuItems: MenuItem[];

  fieldOptions: FieldOption[] | undefined;

  selectedFieldOption: FieldOption | undefined;

  fieldType: FieldType | undefined;

  conditions: Array<ConditionOption> = [];

  selectedCondition: ConditionOption | undefined;

  valueInputType: string | undefined;
  
  value: string | number | undefined;

  messages: Message[] = [];

  portfolioSubrules$: Observable<PortfolioSubrule[]>;
  
  counterpartySubrules$: Observable<CounterpartySubrule[]>;
  
  priceSubrules$: Observable<PriceSubrule[]>;

  constructor(private store: Store<AppState>) {
    this.menuItems = [
      {
        label: 'Add',
        command: () => {
          this.handleAdd();
        }
      },
      {
        label: 'Clear',
        command: () => {
          this.handleClear();
        }
      }
    ]

    this.portfolioSubrules$ = this.store.select(portfolioSubrulesSlice)
    this.counterpartySubrules$ = this.store.select(counterpartySubrulesSlice)
    this.priceSubrules$ = this.store.select(priceSubrulesSlice)
  }

  ngOnInit() {
      this.fieldOptions = [
          { name: FieldOptionName.Portfolio, code: FieldOptionCode.Portfolio },
          { name: FieldOptionName.CounterParty, code: FieldOptionCode.CounterParty },
          { name: FieldOptionName.Price, code: FieldOptionCode.Price }
      ];
  }

  handleFieldTypeAndConditionAndValueInputs(value: FieldOption) {
    this.conditions = []
    if (value.code === FieldOptionCode.Portfolio || value.code === FieldOptionCode.CounterParty) {
      this.fieldType = FieldType.String
      this.conditions.push({
        name: StringCondition.Containing,
        code: StringCondition.Containing
      })
      this.conditions.push({
        name: StringCondition.NotContaining,
        code: StringCondition.NotContaining
      })
      this.conditions.push({
        name: StringCondition.BeginningWith,
        code: StringCondition.BeginningWith
      })
      this.conditions.push({
        name: StringCondition.EndingWith,
        code: StringCondition.EndingWith
      })
      
      this.valueInputType = FieldType.String
    } else if (value.code === FieldOptionCode.Price) {
      this.fieldType = FieldType.Number
      this.conditions.push({
        name: NumberCondition.GreaterThan,
        code: NumberCondition.GreaterThan
      })
      this.conditions.push({
        name: NumberCondition.GreaterThanOrEqualTo,
        code: NumberCondition.GreaterThanOrEqualTo
      })
      this.conditions.push({
        name: NumberCondition.LessThan,
        code: NumberCondition.LessThan
      })
      this.conditions.push({
        name: NumberCondition.LessThanOrEqualTo,
        code: NumberCondition.LessThanOrEqualTo
      })
      this.conditions.push({
        name: NumberCondition.EqualTo,
        code: NumberCondition.EqualTo
      })
      this.conditions.push({
        name: NumberCondition.NotEqualTo,
        code: NumberCondition.NotEqualTo
      })
      this.valueInputType = FieldType.Number
    }
  }

  handleAdd() {
    if (this.validateValueInput()) {
      if (this.selectedFieldOption?.name === FieldOptionName.Portfolio) {
        this.portfolioSubrules$.pipe(take(1)).subscribe(portfolioSubrules => {
          const newSubrule: Subrule = {
              index: -1,
              field: this.selectedFieldOption?.name || "",
              fieldType: this.fieldType || "",
              condition: this.selectedCondition?.name || "",
              value: this.value as string || ""
          };
          this.store.dispatch(addPortfolioSubrule({ newSubrule }));
        });
      } else if (this.selectedFieldOption?.name === FieldOptionName.CounterParty) {
        this.counterpartySubrules$.pipe(take(1)).subscribe(counterpartySubrules => {
          const newSubrule: Subrule = {
              index: -1,
              field: this.selectedFieldOption?.name || "",
              fieldType: this.fieldType || "",
              condition: this.selectedCondition?.name || "",
              value: this.value as string || ""
          };
          this.store.dispatch(addCounterpartySubrule({ newSubrule }));
        });
      } else if (this.selectedFieldOption?.name === FieldOptionName.Price) {
        this.priceSubrules$.pipe(take(1)).subscribe(priceSubrules => {
          const newSubrule: Subrule = {
              index: -1,
              field: this.selectedFieldOption?.name || "",
              fieldType: this.fieldType || "",
              condition: this.selectedCondition?.name || "",
              value: this.value as string || ""
          };
          this.store.dispatch(addPriceSubrule({ newSubrule }));
        });
      }
    }
    
  }

  handleClear() {
    this.selectedFieldOption = undefined;
    this.fieldType = undefined;
    this.conditions =[];
    this.selectedCondition = undefined;
    this.valueInputType = undefined;
    this.value = undefined;
  }

  validateValueInput() {
    if (this.selectedFieldOption === undefined
      && this.selectedCondition === undefined
      && this.value === undefined
    ) {
      this.messages = [{ severity: 'error', detail: 'Please select a Field Option and Condition, and enter a Value.' }];
    } else if (this.selectedCondition === undefined
      && (this.value === undefined
        || this.value === ""
      )
    ) {
      this.messages = [{ severity: 'error', detail: 'Please select a Condition, and enter a Value.' }];
    } else if (this.selectedFieldOption === undefined
      && this.selectedCondition === undefined
    ) {
      this.messages = [{ severity: 'error', detail: 'Please select a Field Option and Condition' }];
    } else if (this.selectedFieldOption === undefined) {
      this.messages = [{ severity: 'error', detail: 'Please select a Field Option.' }];
    } else if (this.selectedCondition === undefined) {
      this.messages = [{ severity: 'error', detail: 'Please select a Condition.' }];
    } else if (this.value === undefined
      || this.value === ""
    ) {
      this.messages = [{ severity: 'error', detail: 'Please enter a Value.' }];
    } else if ((this.selectedFieldOption.name === FieldOptionName.Portfolio 
        || this.selectedFieldOption.name === FieldOptionName.CounterParty) 
      && !this.isValidString(this.value as string)) {
      this.messages = [{ severity: 'error', detail: 'Please enter a Value containing only A-Z, a-z and spaces.' }];
    } else if (this.selectedFieldOption.name === FieldOptionName.Price
      && !this.isNumber(this.value as string)
    ) {
      this.messages = [{ severity: 'error', detail: 'Please enter a Value that is positive, negative or zero.' }];
    } else {
      this.messages = []
      return true
    }
    return false
  }

  isValidString(inputString: string): boolean {
    if (inputString.length === 0) { 
        return false;
    }

    for (const char of inputString) {
        if (!(char.match(/[a-zA-Z]/) || char === ' ')) {
            return false;
        }
    }

    return true;
  }

  isNumber(inputString: string): boolean {
    const regex = /^-?\+?\d+$/;
  
    return regex.test(inputString);
}
}
