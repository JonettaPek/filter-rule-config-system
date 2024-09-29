import { createAction, props } from "@ngrx/store";

export const addLogicalOperatorCombination = createAction("[Logical Operator Combination Component] Add", props<{ newCombination: { [key: string]: string }}>());
export const addField = createAction("[Available Fields Component] Add", props<{ newField: string }>());
export const removeField = createAction("[Available Fields Component] Remove", props<{ fieldToDelete: string }>());