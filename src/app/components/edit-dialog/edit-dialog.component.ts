import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldOption, FieldOptionCode, FieldOptionName, FieldType, NumberCondition, StringCondition } from '../rule-configuration/rule-configuration.component';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [DialogModule, DropdownModule, FormsModule, ButtonModule],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  encapsulation: ViewEncapsulation.None
})
export class EditDialogComponent implements OnInit, OnDestroy {

  fieldOptions: FieldOption[] = [];

  selectedFieldOption: FieldOption | undefined;

  fieldType: FieldType | undefined;

  conditions: Array<string> = [];

  selectedCondition: string | undefined;

  valueInputType: string | undefined;
  
  value: string | number | undefined;

  visible: boolean = true;

  constructor() {

  }
  
  ngOnInit() {
    this.fieldOptions = [
      { name: FieldOptionName.Portfolio, code: FieldOptionCode.Portfolio },
      { name: FieldOptionName.CounterParty, code: FieldOptionCode.CounterParty },
      { name: FieldOptionName.Price, code: FieldOptionCode.Price }
    ];
  }

  ngOnDestroy(): void {
    
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
}
