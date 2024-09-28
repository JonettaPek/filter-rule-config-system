import { createReducer, on } from "@ngrx/store"
import { Subrule } from "../portfolio-subrule/portfolio-subrule.reducer"
import { addPriceSubrule, deletePriceSubrule, editPriceSubrule, revertPriceSubrule } from "./price-subrule.actions"

export type PriceSubrule = Subrule

export interface PriceRuleState {
    priceSubrules: PriceSubrule[]
}

export const initialPriceRuleState: PriceRuleState = {
    priceSubrules: []
}

export const PriceRuleReducer = createReducer(
    initialPriceRuleState,
    on(addPriceSubrule, (state, {newSubrule}) => ({priceSubrules: [...state.priceSubrules, newSubrule]})),
    on(deletePriceSubrule, (state, {index}) => {
        state.priceSubrules.splice(index, 1)
        return {priceSubrules: [...state.priceSubrules]}
    }),
    on(editPriceSubrule, (state, {index, updatedSubrule}) => {
        state.priceSubrules.splice(index, 1)
        state.priceSubrules[index] = updatedSubrule
        return {priceSubrules: [...state.priceSubrules]}
    }),
   on(revertPriceSubrule, (state) => ({priceSubrules: [...state.priceSubrules]}))
)