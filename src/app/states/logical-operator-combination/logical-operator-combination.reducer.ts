import { createReducer, on } from "@ngrx/store";
import { addField, addLogicalOperatorCombination, removeField } from "./logical-operator-combination.actions";

export interface LogicalOperatorCombinationState {
    availableFields: Set<string>
    combination: { [key: string]: string }
}

export const initialLogicalOperatorCombination: LogicalOperatorCombinationState = {
    availableFields: new Set(),
    combination: { }

}

export const LogicalOperatorCombinationReducer = createReducer(
    initialLogicalOperatorCombination,
    on(addLogicalOperatorCombination, (state, { newCombination }) => ({
        ...state,
        combination: { ...state.combination, ...newCombination}
    })),
    on(addField, (state, { newField }) => ({
        ...state,
        availableFields: new Set([...state.availableFields, newField])
    })),
    on(removeField, (state, { fieldToDelete }) => ({
        ...state,
        availableFields: new Set([...state.availableFields].filter(f => f !== fieldToDelete))
    }))
)