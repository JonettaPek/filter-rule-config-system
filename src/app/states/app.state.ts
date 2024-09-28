import { CounterpartyRuleState } from "./counterparty-subrule/counterparty-subrule.reducer";
import { PortfolioRuleState } from "./portfolio-subrule/portfolio-subrule.reducer";
import { PriceRuleState } from "./price-subrule/price-subrule.reducer";

export interface AppState {
    portfolioRuleState: PortfolioRuleState,
    counterpartyRuleState: CounterpartyRuleState,
    priceRuleState: PriceRuleState
}