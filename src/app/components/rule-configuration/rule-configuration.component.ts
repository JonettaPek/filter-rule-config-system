import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessagesModule } from 'primeng/messages';

interface MenuItem {
  label: string,
  command(): void
}

export enum FieldOptionName {
  Portfolio = 'Portfolio',
  CounterParty = 'Counterparty',
  Price = 'Price'
}

enum FieldOptionCode {
  Portfolio = 'portfolio',
  CounterParty = 'counterparty',
  Price = 'price'
}

export interface FieldOption {
  name: FieldOptionName;
  code: FieldOptionCode;
}

enum FieldType {
  String = 'string',
  Number = 'number',
  Date = 'Date'
}

enum StringCondition {
  Containing = 'Containing',
  NotContaining = 'Not Containing',
  BeginningWith = 'Beginning With',
  EndingWith = 'Ending With'
}

enum NumberCondition {
  GreaterThan = '>',
  GreaterThanOrEqualTo = '>=',
  LessThan = '<',
  LessThanOrEqualTo = '<=',
  EqualTo = '=',
  NotEqualTo = '!='
}

interface Message {
  severity: string,
  detail: string
}

class Subrule {
  field: FieldOption | undefined
  fieldType: string | undefined
  condition: string | undefined
  value: string | number | undefined

  constructor(
    field: FieldOption | undefined,
    fieldType: string | undefined,
    condition: string | undefined,
    value: string | number | undefined
  ) {
    this.field = field;
    this.fieldType = fieldType;
    this.condition = condition;
    this.value = value;
  }
}

interface RuleNode {
  logicalOperator: 'AND' | 'OR',
  subrules: (Subrule | RuleNode)[]
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

  conditions: Array<string> = [];

  selectedCondition: string | undefined;

  valueInputType: string | undefined;
  
  value: string | number | undefined;

  messages: Message[] = [];

  rules: Map<FieldOption, RuleNode> = new Map<FieldOption, RuleNode>();

  @Output()
  newSubrule: Subrule | undefined;

  constructor() {
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
      this.conditions.push(StringCondition.Containing)
      this.conditions.push(StringCondition.NotContaining)
      this.conditions.push(StringCondition.BeginningWith)
      this.conditions.push(StringCondition.EndingWith)
      this.valueInputType = FieldType.String
    } else if (value.code === FieldOptionCode.Price) {
      this.fieldType = FieldType.Number
      this.conditions.push(NumberCondition.GreaterThan)
      this.conditions.push(NumberCondition.GreaterThanOrEqualTo)
      this.conditions.push(NumberCondition.LessThan)
      this.conditions.push(NumberCondition.LessThanOrEqualTo)
      this.conditions.push(NumberCondition.EqualTo)
      this.conditions.push(NumberCondition.NotEqualTo)
      this.valueInputType = FieldType.Number
    }
  }

  handleAdd() {
    this.validateValueInput();

    let newSubrule: Subrule = new Subrule(
      this.selectedFieldOption,
      this.fieldType,
      this.selectedCondition,
      this.value
    )
    
    this.newSubrule = newSubrule
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
    }
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
