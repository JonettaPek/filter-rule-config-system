import { createAction, props } from "@ngrx/store";
import { CounterpartySubrule } from "./counterparty-subrule.reducer";

export const addCounterpartySubrule = createAction("[Counterparty Subrule Component] Add", props<{newSubrule: CounterpartySubrule}>());
export const deleteCounterpartySubrule = createAction("[Counterparty Subrule Component] Delete", props<{index: number}>());
export const editCounterpartySubrule = createAction("[Counterparty Subrule Component] Edit", props<{index: number, updatedSubrule: CounterpartySubrule}>());
export const revertCounterpartySubrule = createAction("[Counterparty Subrule Component] Revert");