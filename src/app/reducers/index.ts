import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';


import { features } from '../store/features/features';

export interface State {}

export const reducers: ActionReducerMap<State> = {
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
