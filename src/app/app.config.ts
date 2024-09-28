import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { PortfolioRuleReducer } from './states/portfolio-subrule/portfolio-subrule.reducer';
import { CounterpartyRuleReducer } from './states/counterparty-subrule/counterparty-subrule.reducer';
import { PriceRuleReducer } from './states/price-subrule/price-subrule.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    provideStore(),
    provideState({
      name: 'Portfolio Subrules',
      reducer: PortfolioRuleReducer
    }),
    provideState({
      name: 'Counterparty Subrules',
      reducer: CounterpartyRuleReducer
    }),
    provideState({
      name: 'Price Subrules',
      reducer: PriceRuleReducer
    })
  ]
};
