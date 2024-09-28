import { createAction, props } from "@ngrx/store";
import { PriceSubrule } from "./price-subrule.reducer";

export const addPriceSubrule = createAction("[Price Subrule Component] Add", props<{newSubrule: PriceSubrule}>());
export const deletePriceSubrule = createAction("[Price Subrule Component] Delete", props<{index: number}>());
export const editPriceSubrule = createAction("[Price Subrule Component] Edit", props<{index: number, updatedSubrule: PriceSubrule}>());
export const revertPriceSubrule = createAction("[Price Subrule Component] Revert");