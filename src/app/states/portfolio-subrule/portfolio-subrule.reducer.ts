import { createReducer, on } from "@ngrx/store"
import { addPortfolioSubrule, deletePortfolioSubrule, editPortfolioSubrule, revertPortfolioSubrule } from "./portfolio-subrule.actions"

export interface Subrule {
    index: number,
    field: string | undefined,
    fieldType: string | undefined,
    condition: string | undefined,
    value: string | undefined,
    
}

export type PortfolioSubrule = Subrule

export interface PortfolioRuleState {
    portfolioSubrules: PortfolioSubrule[]
}

export const initialPortfolioRuleState: PortfolioRuleState = {
    portfolioSubrules: []
}

export const PortfolioRuleReducer = createReducer(
    initialPortfolioRuleState,
    on(addPortfolioSubrule, (state, {newSubrule}) => ({portfolioSubrules: [...state.portfolioSubrules, newSubrule]})),
    on(deletePortfolioSubrule, (state, {index}) => {
        state.portfolioSubrules.splice(index, 1)
        return {portfolioSubrules: [...state.portfolioSubrules]}
    }),
    on(editPortfolioSubrule, (state, {index, updatedSubrule}) => {
        state.portfolioSubrules.splice(index, 1)
        state.portfolioSubrules[index] = updatedSubrule
        return {portfolioSubrules: [...state.portfolioSubrules]}
    }),
   on(revertPortfolioSubrule, (state) => ({portfolioSubrules: [...state.portfolioSubrules]}))
)