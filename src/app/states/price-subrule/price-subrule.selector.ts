import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectPriceoRuleState = (state: AppState) => state.priceRuleState

export const priceSubrulesSlice = createSelector(
    selectPriceoRuleState,
    (state) => state.priceSubrules
)