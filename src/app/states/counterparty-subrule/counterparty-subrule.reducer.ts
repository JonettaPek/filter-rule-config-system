import { createReducer, on } from "@ngrx/store"
import { Subrule } from "../portfolio-subrule/portfolio-subrule.reducer"
import { addCounterpartySubrule, deleteCounterpartySubrule, editCounterpartySubrule, revertCounterpartySubrule } from "./counterparty-subrule.actions"

export type CounterpartySubrule = Subrule

export interface CounterpartyRuleState {
    counterpartySubrules: CounterpartySubrule[]
}

export const initialCounterpartyRuleState: CounterpartyRuleState = {
    counterpartySubrules: []
}

export const CounterpartyRuleReducer = createReducer(
    initialCounterpartyRuleState,
    on(addCounterpartySubrule, (state, {newSubrule}) => ({counterpartySubrules: [...state.counterpartySubrules, newSubrule]})),
    on(deleteCounterpartySubrule, (state, {index}) => {
        state.counterpartySubrules.splice(index, 1)
        return {counterpartySubrules: [...state.counterpartySubrules]}
    }),
    on(editCounterpartySubrule, (state, {index, updatedSubrule}) => {
        state.counterpartySubrules.splice(index, 1)
        state.counterpartySubrules[index] = updatedSubrule
        return {counterpartySubrules: [...state.counterpartySubrules]}
    }),
   on(revertCounterpartySubrule, (state) => ({counterpartySubrules: [...state.counterpartySubrules]}))
)