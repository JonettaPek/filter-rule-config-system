import { createReducer, on } from "@ngrx/store"
import { Subrule } from "../portfolio-subrule/portfolio-subrule.reducer"
import { addPriceSubrule, deletePriceSubrule, editPriceSubrule, revertPriceSubrule } from "./price-subrule.actions"

export type PriceSubrule = Subrule

export interface PriceRuleState {
    lastId: number
    priceSubrules: PriceSubrule[]
}

export const initialPriceRuleState: PriceRuleState = {
    lastId: -1,
    priceSubrules: []
}

export const PriceRuleReducer = createReducer(
    initialPriceRuleState,
    on(addPriceSubrule, (state, { newSubrule }) => ({
        ...state,
        lastId: state.lastId + 1,
        priceSubrules: [...state.priceSubrules, { ...newSubrule, index: state.lastId + 1 }]
    })),
    on(deletePriceSubrule, (state, { index }) => ({
        ...state,
        priceSubrules: state.priceSubrules.filter((_, i) => i !== index)
    })),
    on(editPriceSubrule, (state, { index, updatedSubrule }) => ({
        ...state,
        priceSubrules: state.priceSubrules.map((subrule, i) =>
          i === index ? { ...subrule, ...updatedSubrule } : subrule
        )
    })),
    on(revertPriceSubrule, (state) => ({
        ...state,
        priceSubrules: [...state.priceSubrules]
    }))
)