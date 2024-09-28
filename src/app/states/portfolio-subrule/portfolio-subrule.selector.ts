import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectPortfolioRuleState = (state: AppState) => state.portfolioRuleState

export const portfolioSubrulesSlice = createSelector(
    selectPortfolioRuleState,
    (state) => state.portfolioSubrules
)