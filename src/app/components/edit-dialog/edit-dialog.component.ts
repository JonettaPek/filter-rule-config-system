import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConditionOption, FieldOption, FieldOptionCode, FieldOptionName, FieldType, NumberCondition, StringCondition } from '../rule-configuration/rule-configuration.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subrule } from '../../states/portfolio-subrule/portfolio-subrule.reducer';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { editCounterpartySubrule } from '../../states/counterparty-subrule/counterparty-subrule.actions';
import { editPortfolioSubrule } from '../../states/portfolio-subrule/portfolio-subrule.actions';
import { editPriceSubrule } from '../../states/price-subrule/price-subrule.actions';
import { portfolioSubrulesSlice } from '../../states/portfolio-subrule/portfolio-subrule.selector';
import { take } from 'rxjs';
import { counterpartySubrulesSlice } from '../../states/counterparty-subrule/counterparty-subrule.selector';
import { priceSubrulesSlice } from '../../states/price-subrule/price-subrule.selector';

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

  fieldType: string | undefined;

  conditions: Array<ConditionOption> = [];

  selectedCondition: ConditionOption | undefined;

  valueInputType: string | undefined;
  
  value: string | undefined;

  visible: boolean = true;

  currentSubrule: Subrule | undefined;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    this.fieldOptions = [
      { name: FieldOptionName.Portfolio, code: FieldOptionCode.Portfolio },
      { name: FieldOptionName.CounterParty, code: FieldOptionCode.CounterParty },
      { name: FieldOptionName.Price, code: FieldOptionCode.Price }
    ];
  }
  
  ngAfterViewInit() {
    if (this.config.data.subrule) {
      this.currentSubrule = this.config.data.subrule;

      if (this.currentSubrule?.fieldType === FieldType.String) {
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
      } else if (this.currentSubrule?.fieldType === FieldType.Number) {
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
  
      this.selectedFieldOption = this.fieldOptions.find(option => option.name === this.currentSubrule?.field);
      this.fieldType = this.currentSubrule?.fieldType;
      this.selectedCondition = this.conditions.find(condition => condition.name === this.currentSubrule?.condition);
      this.value = this.currentSubrule?.value;
    }
  
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    
  }

  handleSave() {
    const updatedInfo = { 
      index: this.config.data.subrule.index,
      updatedSubrule: {
        index: this.config.data.subrule.index,
        field: this.selectedFieldOption?.name as string,
        fieldType: this.fieldType as string,
        condition: this.selectedCondition?.name as string,
        value: this.value as string
      }
    }
    if (this.currentSubrule?.field === FieldOptionName.Portfolio) {
      this.store.dispatch(editPortfolioSubrule(updatedInfo))
    } else if (this.currentSubrule?.field === FieldOptionName.CounterParty) {
      this.store.dispatch(editCounterpartySubrule(updatedInfo))
    } else if (this.currentSubrule?.field === FieldOptionName.Price) {
      this.store.dispatch(editPriceSubrule(updatedInfo))
    }
    this.close();
  }

  close() {
    this.ref.close();
  }
}
