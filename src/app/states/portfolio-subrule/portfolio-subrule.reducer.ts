import { createReducer, on } from "@ngrx/store"
import { addPortfolioSubrule, deletePortfolioSubrule, editPortfolioSubrule, revertPortfolioSubrule } from "./portfolio-subrule.actions"

export interface Subrule {
    index: number,
    field: string,
    fieldType: string,
    condition: string,
    value: string,
    
}

export type PortfolioSubrule = Subrule

export interface PortfolioRuleState {
    lastId: number
    portfolioSubrules: PortfolioSubrule[]
}

export const initialPortfolioRuleState: PortfolioRuleState = {
    lastId: -1,
    portfolioSubrules: []
}

export const PortfolioRuleReducer = createReducer(
    initialPortfolioRuleState,
    on(addPortfolioSubrule, (state, { newSubrule }) => ({
        ...state,
        lastId: state.lastId + 1,
        portfolioSubrules: [...state.portfolioSubrules, { ...newSubrule, index: state.lastId + 1 }]
    })),
    on(deletePortfolioSubrule, (state, { index }) => ({
        ...state,
        portfolioSubrules: state.portfolioSubrules.filter((_, i) => i !== index)
    })),
    on(editPortfolioSubrule, (state, { index, updatedSubrule }) => ({
        ...state,
        portfolioSubrules: state.portfolioSubrules.map((subrule, i) =>
          i === index ? { ...subrule, ...updatedSubrule } : subrule
        )
    })),
    on(revertPortfolioSubrule, (state) => ({
        ...state,
        portfolioSubrules: [...state.portfolioSubrules]
    }))
)