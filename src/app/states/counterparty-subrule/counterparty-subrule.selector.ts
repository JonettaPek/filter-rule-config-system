import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectCounterpartyRuleState = (state: AppState) => state.counterpartyRuleState

export const counterpartySubrulesSlice = createSelector(
    selectCounterpartyRuleState,
    (state) => state.counterpartySubrules
)