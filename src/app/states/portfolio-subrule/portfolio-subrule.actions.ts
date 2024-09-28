import { createAction, props } from "@ngrx/store"
import { PortfolioSubrule } from "./portfolio-subrule.reducer";

export const addPortfolioSubrule = createAction("[Portfolio Subrule Component] Add", props<{newSubrule: PortfolioSubrule}>());
export const deletePortfolioSubrule = createAction("[Portfolio Subrule Component] Delete", props<{index: number}>());
export const editPortfolioSubrule = createAction("[Portfolio Subrule Component] Edit", props<{index: number, updatedSubrule: PortfolioSubrule}>());
export const revertPortfolioSubrule = createAction("[Portfolio Subrule Component] Revert");
