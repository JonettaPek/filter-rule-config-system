import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectLogicalOperatorCombination = (state: AppState) => state.logicalOperatorCombinationState

export const logicalOperatorCombinationSlice = createSelector(
    selectLogicalOperatorCombination,
    (state) => state.combination
)

export const availableFieldsSlice = createSelector(
    selectLogicalOperatorCombination,
    (state) => Array.from(state.availableFields)
)