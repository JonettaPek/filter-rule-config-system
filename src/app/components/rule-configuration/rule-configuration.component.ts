import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { SplitButtonModule } from 'primeng/splitbutton';

interface MenuItem {
  label: string,
  command(): void
}

enum FieldOptionName {
  Portfolio = 'Portfolio',
  CounterParty = 'Counterparty',
  Price = 'Price'
}

enum FieldOptionCode {
  Portfolio = 'portfolio',
  CounterParty = 'counterparty',
  Price = 'price'
}

interface FieldOption {
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

interface Subrule {
  field: FieldOption,
  fieldType: string,
  condition: StringCondition | NumberCondition,
  value: string | number
}

@Component({
  selector: 'app-rule-configuration',
  standalone: true,
  imports: [DropdownModule, FormsModule, SplitButtonModule],
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

  subrules: Array<Subrule> = [];

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
    

  }

  handleClear() {
    this.selectedFieldOption = undefined;
    this.fieldType = undefined;
    this.conditions =[];
    this.selectedCondition = undefined;
    this.valueInputType = undefined;
    this.value = undefined;
  }
}
