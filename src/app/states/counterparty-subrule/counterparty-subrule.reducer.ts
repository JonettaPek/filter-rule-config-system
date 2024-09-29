import { createReducer, on } from "@ngrx/store"
import { Subrule } from "../portfolio-subrule/portfolio-subrule.reducer"
import { addCounterpartySubrule, deleteCounterpartySubrule, editCounterpartySubrule, revertCounterpartySubrule } from "./counterparty-subrule.actions"

export type CounterpartySubrule = Subrule

export interface CounterpartyRuleState {
    lastId: number
    counterpartySubrules: CounterpartySubrule[]
}

export const initialCounterpartyRuleState: CounterpartyRuleState = {
    lastId: -1,
    counterpartySubrules: []
}

export const CounterpartyRuleReducer = createReducer(
    initialCounterpartyRuleState,
    on(addCounterpartySubrule, (state, { newSubrule }) => ({
        ...state,
        lastId: state.lastId + 1,
        counterpartySubrules: [...state.counterpartySubrules, { ...newSubrule, index: state.lastId + 1 }]
    })),
    on(deleteCounterpartySubrule, (state, { index }) => ({
        ...state,
        counterpartySubrules: state.counterpartySubrules.filter((_, i) => i !== index)
    })),
    on(editCounterpartySubrule, (state, { index, updatedSubrule }) => ({
        ...state,
        portfolioSubrules: state.counterpartySubrules.map((subrule, i) =>
          i === index ? { ...subrule, ...updatedSubrule } : subrule
        )
    })),
    on(revertCounterpartySubrule, (state) => ({
        ...state,
        counterpartySubrules: [...state.counterpartySubrules]
    }))
)